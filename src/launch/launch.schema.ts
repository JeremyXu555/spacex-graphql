import { addMockFunctionsToSchema, makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";
import gql from "graphql-tag";

const schema = gql`
    type Launch {
        flight_number: Int!,
        launch_year: Int!,
        mission_name: String!,
        launch_success: Boolean!,
    }

    type Query {
        launches: [Launch]
    }

    type Mutation {
        createLaunch(
            flight_number: Int!,
            launch_year: Int!,
            mission_name: String!,
            launch_success: Boolean!,
        ): Launch
    }
`;

const launchSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [schema]
});
addMockFunctionsToSchema({ schema: launchSchema });

export { launchSchema };
