import * as express from "express"; 
import * as graphqlHTTP from "express-graphql";
import { generateSchema } from "./schema/index";
import initializeSequilize from "./sequlize";
import UmzugInstance from "./utilities/umzug";

async function runServer(): Promise<void> {
  const schema = await generateSchema();
  const app = express();
  initializeSequilize();

  const migrationsUmzug = UmzugInstance('migrations');
  try {
      await migrationsUmzug.up();
  }
  catch (exception) {
      console.log('Umzug failed to run migrations. ', exception);
      if (process.env.NODE_ENV === 'production') {
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

  // mongoose.set("debug", true);
  // mongoose.connect(`mongodb://localhost:27017/graphExample`);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {console.log("server is running")});

}

runServer().catch((exception): void => {
  // Server Crashed
  console.log(exception);
});
