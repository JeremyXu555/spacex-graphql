import * as express from "express"; 
import * as graphqlHTTP from "express-graphql";
import * as mongoose from "mongoose";
import schemas from "./schema";
import resolvers from "./resolver";
import {
  makeExecutableSchema,
  mergeSchemas,
  addResolveFunctionsToSchema,
} from 'graphql-tools';
import { GraphQLSchema } from "graphql";

const schema: GraphQLSchema = mergeSchemas({
	schemas,
	resolvers
});

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
app.listen(PORT, () => {console.log("server is running")} );
