// import { pubsub } from "../server";
import { dragonController } from "../db/controllers";
import GraphQLJSON from 'graphql-type-json';


const dragonResolver = {
    JSON: GraphQLJSON,
	// Subscription: {
	// 	dragonAdded: {
	// 		subscribe: () => pubsub.asyncIterator([LAUNCH_CREATED])
	// 	}
	// },
	Query: {
		dragons(root: any, args: any, context: any) {
			return dragonController.dragons();
		}
	},
	Mutation: {
		createDragon(root: any, args: any, context: any) {
            // pubsub.publish(LAUNCH_CREATED, { dragonAdded: args });
			return dragonController.createDragon(args);
		}
	}
};

export { dragonResolver };
