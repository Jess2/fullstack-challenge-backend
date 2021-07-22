"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const { MikroORM } = require('@mikro-orm/core');
const { microConfig } = require('./mikro-orm.config');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { buildSchema } = require('type-graphql');
const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};
main().catch(error => {
    console.error('ERROR =========', error);
});
//# sourceMappingURL=index.js.map