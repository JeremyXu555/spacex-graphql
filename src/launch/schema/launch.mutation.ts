const launchMutation = `
    type Mutation {
        createLaunch(
            flight_number: Int!,
            launch_year: Int!,
            mission_name: String!,
            launch_success: Boolean!,
        ): Launch
    }
`;

export { launchMutation };
