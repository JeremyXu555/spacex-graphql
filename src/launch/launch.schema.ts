import { addMockFunctionsToSchema, makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { launchType, launchQuery, launchMutation } from "./schema";

const launchSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [launchType, launchQuery, launchMutation]
});
addMockFunctionsToSchema({ schema: launchSchema });

export { launchSchema };
