// import { pubsub } from "../server";
import { rocketController } from "../db/controllers";

const LAUNCH_CREATED = "POST_ADDED";

const rocketResolver = {
	// Subscription: {
	// 	rocketAdded: {
	// 		subscribe: () => pubsub.asyncIterator([LAUNCH_CREATED])
	// 	}
	// },
	Query: {
		rockets(root: any, args: any, context: any) {
			return rocketController.rockets();
		}
	},
	Mutation: {
		createRocket(root: any, args: any, context: any) {
			// pubsub.publish(LAUNCH_CREATED, { rocketAdded: args });
			return rocketController.createRocket(args);
		}
	}
};

export { rocketResolver };
