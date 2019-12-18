import { addMockFunctionsToSchema, makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { rocketType, rocketQuery, rocketMutation } from "./schema";

const rocketSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [rocketType, rocketQuery, rocketMutation]
});
addMockFunctionsToSchema({ schema: rocketSchema });

export { rocketSchema };
