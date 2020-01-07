import { GraphQLMiddlewareFunction, Resolver } from "../types/graphql-types";
import me_Middleware from "./me_middleware";
import { User } from "../db/models";

export const createMiddleware = (
    middlewareFunction: GraphQLMiddlewareFunction,
    resolverFunction: Resolver
) => (root: any, args: any, context: any, info: any) =>
        middlewareFunction(resolverFunction, root, args, context, info);

export const meResolver = {
    Query: {
        me: createMiddleware(
            me_Middleware,
            (_, __, context) => {
                return User.findOne({ where: { id: context.req.session.userId } })
                    .then(user => {
                        return user.get({ plain: true });
                    });
            }
        )
    }
}
