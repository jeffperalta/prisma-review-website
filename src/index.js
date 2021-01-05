import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Book from './resolvers/Book';
import Review from './resolvers/Review';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Book,
        Review
    },
    context: {
        db,
        pubsub,
        prisma
    }
})

server.start(() => {
    console.log('The server is running..')
});