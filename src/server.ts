import "dotenv/config";
import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { generateSchema } from "./schema/index";
import initializeSequilize from "./sequlize";
import UmzugInstance from "./utilities/umzug";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import expressPlayground from "graphql-playground-middleware-express";
import * as jwt from 'jsonwebtoken';
import { TokenType, refreshTokens } from "./auth";
import { redis } from "./reids";
import { confirmEmail } from "./routes/confirmEmail";

import * as session from "express-session";
import * as connectRedis from "connect-redis";
import { redisSessionPrefix } from "./utilities/constants";
const RedisStore = connectRedis(session);

import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "./db/models";

async function runServer(): Promise<void> {
  const schema = await generateSchema();
  const app = express();
  initializeSequilize();

  const migrationsUmzug = UmzugInstance("migrations");
  try {
    await migrationsUmzug.up();
  }
  catch (exception) {
    console.log("Umzug failed to run migrations. ", exception);
    if (process.env.NODE_ENV === "production") {
      throw exception;
    }
  }

  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
      async function (_: any, __: any, profile: any, cb: any) {
        let user = await User.findOrCreate({ where: { email: profile.emails[0].value } })
          .then(([user, success]) => {
            return user;
          });

        return cb(null, user);
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  app.use(passport.initialize());

  app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {}),
    function (req, res) {
      req.session.userId = (req.user as any).id;
      console.log(req);
      // implement login logic: create session in redis, etc.
      res.redirect('/graphql');
    });

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: redisSessionPrefix
      }),
      secret: process.env.SESSION_SECRET,
      name: "spacex-session",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  const addUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['x-token'] as string;
    if (token) {
      try {
        const { user } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as TokenType;
        req.headers['user'] = JSON.stringify(user);
      } catch (error) {
        const refreshToken = req.headers['x-refresh-token'] as string;
        const newTokens = await refreshTokens(refreshToken);

        if (newTokens.token && newTokens.refreshToken) {
          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        }
        req.headers['user'] = JSON.stringify(newTokens.user);
      }
    }
    next();
  }
  app.use(addUser);

  app.use(
    "/graphql",
    graphqlHTTP((req, res) => ({
      schema,
      graphiql: true,
      context: {
        req: req,
        res: res,
        redis: redis,
      },
    }),
    ),
  );

  app.get("/confirm/:id", confirmEmail);

  app.get(
    "/playground",
    expressPlayground({
      endpoint: "/graphql",
      subscriptionEndpoint: "/subscriptions",
    })
  );

  const ws = createServer(app);
  ws.listen(4000, () => {
    console.log(`GraphQL Server is now running on http://localhost:4000`);
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server: ws,
      path: "/subscriptions",
    });
  });
}

runServer().catch((exception): void => {
  // Server Crashed
  console.log(exception);
});
