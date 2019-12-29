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
			return userController.createUser(args);
		},
		login(root: any, args: User, context: any) {
			return userController.login(args, context);
		}
	}
};

export { userResolver };
