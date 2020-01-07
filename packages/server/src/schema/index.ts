import * as fs from 'fs';
import * as path from 'path';
import gql from 'graphql-tag';
import {
    makeExecutableSchema,
    mergeSchemas,
    addResolveFunctionsToSchema,
} from 'graphql-tools';
import {
    GraphQLSchema,
    printSchema,
} from 'graphql';
import { importSchema } from 'graphql-import';
import { buildFederatedSchema } from '@apollo/federation';
import { launchResolver } from './launch.resolver';
import { rocketResolver } from './rocket.resolver';
import { dragonResolver } from './dragon.resolver';
import { userResolver } from './user.resolver';
import { meResolver } from './me.resolver';



async function schemaForTypeDef(filename: string): Promise<GraphQLSchema> {
    const typeDefs = importSchema("./src/schema/" + filename);

    return makeExecutableSchema({
        typeDefs: [typeDefs]
    });
}

export async function generateSchema(): Promise<GraphQLSchema> {

    const schemaNames = fs
        .readdirSync(__dirname)
        .filter((file): boolean => path.extname(file) === '.graphql');

    const typeDefs = await Promise.all(schemaNames.map(schemaForTypeDef));

    const mergedSchemas = mergeSchemas({ schemas: typeDefs });
    const schemaSDL = gql`${printSchema(mergedSchemas)}`;
    const schema = buildFederatedSchema([schemaSDL]);

    const resolvers = [launchResolver, rocketResolver, dragonResolver, userResolver, meResolver];


    resolvers.forEach((resolver): void => {
        addResolveFunctionsToSchema({
            schema,
            resolvers: resolver,
        });
    });

    return schema;
}
