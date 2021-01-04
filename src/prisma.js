import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query.users(null, '{ id, name, email, posts {id, title} }')
//     .then(data => {
//         console.log("users: ", JSON.stringify(data, undefined, 2));
//     }); 

// prisma.query.comments(null, '{id, text, author { id name }}')
//     .then(data => {
//         console.log("comments: ", JSON.stringify(data, undefined, 2));
//     });

// prisma.query.posts({where: {title_contains: "Graph"}}, '{id, title, published, author{id name}}')
//     .then(data => {
//         console.log("posts: ", JSON.stringify(data, undefined, 2));
//     });

// prisma.mutation.createPost({
//     data: {
//         title: "Software development",
//         body: "",
//         published: true,
//         author: {
//             create: {
//                 name: "Jestono Piaga",
//                 email: "jpiaga@gg.com"
//             }
//         }
//     }
// }, '{id title body published author { name }}')
// .then(data => {
//     console.log("post: ", JSON.stringify(data, undefined, 2));
// })

// prisma.mutation.updatePost({
//     where: {
//         id: "ckjicl3xh01sn0842sbvesvce"
//     },
//     data: {
//         title: "Software development 2",
//         body: "A course that will discuss about the fundamentals of computer programming",
//         published: true
//     }
// }, '{ id }').then(data => {
//     return prisma.query.posts(null, '{ id title body published }')
// }).then(data => {
//     console.log("all posts: ", JSON.stringify(data, undefined, 2))
// })

// const createPostForUser = async (authorId, data) => {
//     const post = await prisma.mutation.createPost({
//         data: {
//             ... data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ id }');
//     const user = await prisma.query.user({
//         where: {
//             id: authorId
//         }
//     }, '{ id name email posts {id title published} }');
//     return {post, user};
// }
// createPostForUser("ckji82ipa01fr0842ujoy5b3z", {
//     title: "Gardening",
//     body: "Making your room greener",
//     published: true
// }).then(data => {
//     console.log("post and user: ", JSON.stringify(data, undefined, 2))
// })

// const updatePostForUser = async(postId, data) => {
//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{ author { id } }');
//     const user = await prisma.query.user({
//         where:{
//             id: post.author.id
//         }
//     }, '{id name email age}')
//     return user;
// };
// updatePostForUser("ckjidlxos01tn0842b79z4m01", {title: "Gardening 2"})
// .then(data => {
//     console.log("user: ", JSON.stringify(data, undefined, 2))
// })