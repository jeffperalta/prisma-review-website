import { GraphQLServer } from 'graphql-yoga'

const posts = [{
    id: '123123-A',
    title: 'Photograpy',
    body: 'A course for taking stunning and beautiful photos',
    published: true,
    author: '123773'
}, {
    id: '123123-B',
    title: 'Programming with NodeJs',
    body: 'Learn how to code using your favourite programming language',
    published: false,
    author: '123773'
}, {
    id: '123123-C',
    title: 'GraphQL 101',
    body: 'Explore the world of GraphQL',
    published: true,
    author: '123774'
}];

const users = [{
    id: '123777',
    name: 'Teddy',
    email: 'teddy@gg.com',
    age: 4
}, {
    id: '123773',
    name: 'Romina',
    email: 'romina@gg.com',
    age: 34
}, {
    id: '123774',
    name: 'Fanny',
    email: 'fanny@gg.com',
    age: 33
}];

const comments = [{
    id: '110',
    text: 'Excellent class to learn this topic!',
    author: '123777'
}, {
    id: '111',
    text: 'I have learned a lot during this course. Thanks',
    author: '123773'
}, {
    id: '112',
    text: 'The content is sufficient enough to keep me interested.',
    author: '123774'
}, {
    id: '113',
    text: 'I will give it a two thumbs up!',
    author: '123777'
}];

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        book: Book!
        user: User!
        post: Post!
        greeting(name: String): String!
        add(a: Float!, b: Float!): Float!
        addition(nums: [Float]): Float!
        grades: [Int!]!
        posts(query: String): [Post!]!
        users(query: String): [User!]!
        comments: [Comment!]!
    }

    type Book {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
    }
`;

// Resolvers (functions)
const resolvers = {
    Query: {
        id() {
            return 'abc123'
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
        }, 
        book() {
           return {
               title: 'Title of the book',
               price: 12.50,
               releaseYear: 2008,
               rating: 4.5,
               inStock: true
           } 
        },
        user(parent, args, ctx, info) {
            return {
                id: '123123',
                name: 'Romina',
                email: 'romina@gg.com'
            }
        },
        post(parent, args, ctx, info) {
            return {
                id: '123123-A',
                title: 'Title of the post',
                body: 'Body of the post',
                published: true
            }
        },
        greeting(parent, args, ctx, info) {
            if(args['name']) {
                return "Hello, " + args['name'] + "!"
            }else{
                return "Hello!"
            }   
        },
        add(parent, args, ctx, info) {
            return args.a + args.b;
        },
        addition(parent, args, ctx, info) {
            if(args.nums.length === 0) return 0;
            return args.nums.reduce((a,b) => a + b, 0);
        },
        grades(parent, args, ctx, info) {
            return [1,2,3,4,5]
        },
        posts(parent, args, ctx, info) {
            if(args.query) {
                return posts.filter(p => 
                    p.title.toLowerCase().includes(args.query.toLowerCase())
                    || p.body.toLowerCase().includes(args.query.toLowerCase())
                )
            }else{
                return posts
            }
        
        },
        users(parent, args, ctx, info) {
            if(args.query){
                return users.filter(u => u.name.toLowerCase().includes(args.query.toLowerCase()))
            }else{
                return users
            }
        },
        comments(parent, args, ctx, info) {
            return comments;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(u => u.id === parent.author);
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(p => p.author === parent.id);
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(u => u.id === parent.author);
        }
    }
}


const server = new GraphQLServer({typeDefs, resolvers})

server.start(() => {
    console.log('The server is running..')
});