import pubsub from "../pubsub";
import { launchController } from "../db/controllers";

const CREATE_LAUNCH = "CREATE_LAUNCH";

const launchResolver = {
	Subscription: {
		launchAdded: {
			subscribe: () => pubsub.asyncIterator(CREATE_LAUNCH)
		}
	},
	Query: {
		launches(root: any, args: any, context: any) {
			return launchController.launches();
		}
	},
	Mutation: {
		createLaunch(root: any, args: any, context: any) {
			pubsub.publish(CREATE_LAUNCH, { launchAdded: args });
			return launchController.createLaunch(args);
		}
	}
};

export { launchResolver };
