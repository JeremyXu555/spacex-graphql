import { userController } from "../db/controllers";
import { User } from "../db/models";
import { SpaceXContext } from "../types/SpaceXContext";
import { userSessionPrefix, redisSessionPrefix } from "../utilities/constants";

const userResolver = {
	Query: {
		users(root: any, args: any, context: any) {
			return userController.users();
		}
	},
	Mutation: {
		createUser(root: any, args: any, context: any) {
			if (!context.req.headers['user']) {
				throw new Error('User not authenticated');
			}
			return userController.createUser(args, context);
		},
		deactivateUser(root: any, args: User, context: any) {
			return userController.deactivate_user(args);
		},
		login(root: any, args: User, context: any) {
			return userController.login(args, context);
		},
		async logout(root: any, args: any, context: SpaceXContext) {
			const session = context.req.session;

			if (session.userId) {
				const sessionIds = await context.redis.lrange(
					`${userSessionPrefix}${session.userId}`,
					0,
					-1
				)

				const promises = [];
				for (let i = 0; i < sessionIds.length; i++) {
					promises.push(context.redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
				}
				promises.push(context.redis.del(`${userSessionPrefix}${session.userId}`));
				await Promise.all(promises);
				return true;
			}
			return false;
			// new Promise((resolve, reject) => {
			// 	session.destroy(err => {
			// 		if (err) reject(err);
			// 		resolve(true);
			// 	})
			// });
		}
	}
};

export { userResolver };
