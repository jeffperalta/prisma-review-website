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
//     const userExist = await prisma.exists.User({
//         id: authorId
//     });
//     if(!userExist) {
//         throw new Error('User not found')
//     }
//     const post = await prisma.mutation.createPost({
//         data: {
//             ... data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published } } }');
//     return post.author;
// }
// createPostForUser("ckji82ipa01fr0842ujoy5b3z", {
//     title: "Music Lessons 2",
//     body: "Learn to read the music notes",
//     published: true
// }).then(data => {
//     console.log("New Post For User: ", JSON.stringify(data, undefined, 2))
// }).catch((error) => {
//     console.log(error.message);
// })

// const updatePostForUser = async(postId, data) => {
//     const postExist = await prisma.exists.Post({
//         id: postId
//     });
//     if(!postExist) {
//         throw new Error('Post not found')
//     }
//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{ author { id name email posts { id title published } } }');
//     return post.author;
// };
// updatePostForUser("ckjj9gq6n001m0842ls69l2nf", {
//     title: "Basic Music Lessions"
// })
// .then(data => {
//     console.log("user: ", JSON.stringify(data, undefined, 2))
// })
// .catch(error => {
//     console.log(error.message);
// })

//prisma.query.comments(null,'{id text, author {name}}').then(data => console.log(JSON.stringify(data, undefined, 2)))
// prisma.exists.Comment({
//     id: "ckji7y8au01ct0842f8jgl8ul",
//     author: {
//         name: "Romina Peralta"
//     }
// }).then(exist => {
//     if (exist) {
//         console.log("Exist");
//     }else{
//         console.log("Does not exist");
//     }
// })