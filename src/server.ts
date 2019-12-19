import * as express from "express"; 
import * as graphqlHTTP from "express-graphql";
import * as mongoose from "mongoose";
import { generateSchema } from "./schema/index";

async function runServer(): Promise<void> {
  const schema = await generateSchema();
  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );

  mongoose.set("debug", true);
  mongoose.connect(`mongodb://localhost:27017/graphExample`);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {console.log("server is running")});

}

runServer().catch((exception): void => {
  // Server Crashed
  console.log(exception);
});
