import { GraphQLServer } from 'graphql-yoga'
import {v4 as uuidv4} from 'uuid';
import db from './db';

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
        user(parent, args, { db }, info) {
            return {
                id: '123123',
                name: 'Romina',
                email: 'romina@gg.com'
            }
        },
        post(parent, args, { db }, info) {
            return {
                id: '123123-A',
                title: 'Title of the post',
                body: 'Body of the post',
                published: true
            }
        },
        greeting(parent, args, { db }, info) {
            if(args['name']) {
                return "Hello, " + args['name'] + "!"
            }else{
                return "Hello!"
            }   
        },
        add(parent, args, { db }, info) {
            return args.a + args.b;
        },
        addition(parent, args, { db }, info) {
            if(args.nums.length === 0) return 0;
            return args.nums.reduce((a,b) => a + b, 0);
        },
        grades(parent, args, { db }, info) {
            return [1,2,3,4,5]
        },
        posts(parent, args, { db }, info) {
            if(args.query) {
                return db.posts.filter(p => 
                    p.title.toLowerCase().includes(args.query.toLowerCase())
                    || p.body.toLowerCase().includes(args.query.toLowerCase())
                )
            }else{
                return db.posts
            }
        
        },
        users(parent, args, { db }, info) {
            if(args.query){
                return db.users.filter(u => u.name.toLowerCase().includes(args.query.toLowerCase()))
            }else{
                return db.users
            }
        },
        comments(parent, args, { db }, info) {
            return db.comments;
        }
    },
    Mutation: {
        createUser(parent, args, { db }, info) {
            if (db.users.some(u => u.email === args.data.email)) {
                throw new Error('Email is taken.');
            }else{
                const user = {
                    id: uuidv4(),
                    ... args.data
                }
                
                db.users.push(user);
                return user;
            }
        },
        createPost(parent, args, { db }, info) {
            if (db.users.some(u => u.id === args.data.author)) {
                const post = {
                    id: uuidv4(),
                    ...args.data
                }
                db.posts.push(post)
                return post;
            }else{
                throw new Error('User not found.');
            }
        },
        createComment(parent, args, { db }, info) {
            if (db.users.some(u => u.id === args.data.author)) {
                if (db.posts.some(p => p.id === args.data.post && p.published)) {
                    const comment = {
                        id: uuidv4(),
                        ...args.data
                    }

                    db.comments.push(comment);
                    return comment;
                }else{
                    throw new Error('Post must exist and must be published.');
                }
            }else{
                throw new Error('User not found.');
            }
        },
        deleteUser(parent, args, { db }, info) {
            const index = db.users.findIndex(u => u.id === args.id);
            if(index >= 0) {

                db.comments = db.comments.filter(c => c.author !== args.id)

                db.posts = db.posts.filter(p => {
                    const match = p.author === args.id
                    if(match) {
                        db.comments = db.comments.filter(c => c.post !== p.id)
                    }
                    return !match
                });

                const deletedUsers = db.users.splice(index, 1);

                return deletedUsers[0];
            }else{
                throw new Error('User not found.');
            }
        },
        deletePost(parent, args, { db }, info) {
            const index = db.posts.findIndex(p => p.id === args.id)
            if(index >= 0) {
                db.comments = db.comments.filter(c => c.post !== args.id)
                const deletedPosts = db.posts.splice(index, 1);
                return deletedPosts[0];
            }else{
                throw new Error('Post not found.');
            }
        },
        deleteComment(parent, args, { db }, info) {
            const index = db.comments.findIndex(c => c.id === args.id)
            if (index >= 0) {
                const deletedComments = db.comments.splice(index, 1);
                return deletedComments[0];
            }else {
                throw new Error('Comment not found.');
            }
        }
    },
    Post: {
        author(parent, args, { db }, info) {
            return db.users.find(u => u.id === parent.author);
        },
        comments(parent, args, { db }, info) {
            return db.comments.filter(c => c.post === parent.id);
        }
    },
    User: {
        posts(parent, args, { db }, info) {
            return db.posts.filter(p => p.author === parent.id);
        },
        comments(parent, args, { db }, info) {
            return db.comments.filter(c => c.author === parent.id);
        }
    },
    Comment: {
        author(parent, args, { db }, info) {
            return db.users.find(u => u.id === parent.author);
        },
        post(parent, args, { db }, info) {
            return db.posts.find(p => p.id === parent.post);
        }
    }
}


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers,
    context: {
        db
    }
})

server.start(() => {
    console.log('The server is running..')
});