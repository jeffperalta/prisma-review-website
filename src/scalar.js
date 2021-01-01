import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

// Resolvers (functions)
const resolvers = {
    Query: {
        id() {
            return 'abc123';
        },
        name() {
            return 'Jeff'
        },
        age() {
            return 35
        },
        employed() {
            return true
        },
        gpa() {
            return null
        }
    }
}

const typeDefs2 = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

const resolvers2 = {
    Query: {
        title() { return 'Title of the book' },
        price() { return 12.50 },
        releaseYear() { return 2008 },
        rating() { return 4.5 },
        inStock() { return true }
    }
}

//const server = new GraphQLServer({typeDefs, resolvers})
const server = new GraphQLServer({
    typeDefs: typeDefs2,
    resolvers: resolvers2
})

server.start(() => {
    console.log('The server is running..')
});