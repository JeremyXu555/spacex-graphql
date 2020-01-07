import { Resolver } from "../types/graphql-types";

export default async (
    resolver: Resolver,
    root: any,
    args: any,
    context: any,
    info: any
) => {
    // Something need to do before calling the resolver
    if (!context.req.session.userId) {
        throw new Error("not login yet");
    }
    
    return await resolver(root, args, context, info);

    // Something need to do after executing the resolver
 
}
