// import { pubsub } from "../server";
import { launchController } from "../launch/launch.controller";

const LAUNCH_CREATED = "POST_ADDED";

const launchResolver = {
	// Subscription: {
	// 	launchAdded: {
	// 		subscribe: () => pubsub.asyncIterator([LAUNCH_CREATED])
	// 	}
	// },
	Query: {
		launches(root: any, args: any, context: any) {
			return launchController.launches();
		}
	},
	Mutation: {
		createLaunch(root: any, args: any, context: any) {
			// pubsub.publish(LAUNCH_CREATED, { launchAdded: args });
			return launchController.createLaunch(args);
		}
	}
};

export { launchResolver };
