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
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
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
      schema
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
