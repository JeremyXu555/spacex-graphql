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
import { TokenType, refreshTokens  } from "./auth";

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
    graphqlHTTP(req => ({
      schema,
      graphiql: true,
      // context:{
      //   user:req.headers['user'],
      // },
    }),
    ),
  );

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
