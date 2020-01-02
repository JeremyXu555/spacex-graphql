import { userController } from "../db/controllers";
import { User } from "../db/models";

const userResolver = {
	Query: {
		users(root: any, args: any, context: any) {
			return userController.users();
		}
	},
	Mutation: {
		createUser(root: any, args: any, context: any) {
			if(!context.req.headers['user']) {
				throw new Error('User not authenticated');
			}
			return userController.createUser(args, context);
		},
		deactivateUser(root: any, args: User, context: any) {
			return userController.deactivate_user(args);
		},
		login(root: any, args: User, context: any) {
			return userController.login(args, context);
		}
	}
};

export { userResolver };
