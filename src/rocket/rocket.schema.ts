import { addMockFunctionsToSchema, makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";
import gql from "graphql-tag";

const schema = gql`
	type Rocket {
        id: Int!,
        active: Boolean!,
        stages: Int!,
        boosters: Int!,
        cost_per_launch: String,
        success_rate_pct: Int,
        first_flight: String,
        country: String,
        company: String,
    }

	type Query {
        rockets: [Rocket]
    }

	type Mutation {
        createRocket(
            id: Int!,
            active: Boolean!,
            stages: Int!,
            boosters: Int!,
            cost_per_launch: String,
            success_rate_pct: Int,
            first_flight: String,
            country: String,
            company: String,
        ): Rocket
    }
`;

const rocketSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [schema]
});
addMockFunctionsToSchema({ schema: rocketSchema });

export { rocketSchema };
