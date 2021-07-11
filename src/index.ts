import 'reflect-metadata';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
const { MikroORM } = require('@mikro-orm/core');
// const { Post } = require('./entities/Post');
const { microConfig } = require('./mikro-orm.config');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { buildSchema } = require('type-graphql');

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    // const post = orm.em.create(Post, {title: 'my first post3'});
    // await orm.em.persistAndFlush(post);

    // const posts = await orm.em.find(Post, {});
    // console.log(posts)

    const app = express();
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
}

main().catch(error => {
    console.error('ERROR =========', error);
});