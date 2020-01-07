import { SpaceXContext } from "./SpaceXContext";

export type Resolver = (
    root: any,
    args: any,
    context: SpaceXContext,
    info: any,
) => any;


export type GraphQLMiddlewareFunction = (
    resolver: Resolver,
    root: any,
    args: any,
    context: SpaceXContext,
    info: any,
) => any;
