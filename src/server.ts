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
const RedisStore = connectRedis(session);


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

  app.use(
    session({
      store: new RedisStore({ client: redis }),
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
