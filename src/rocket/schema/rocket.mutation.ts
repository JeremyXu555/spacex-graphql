const rocketMutation = `
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

export { rocketMutation };
