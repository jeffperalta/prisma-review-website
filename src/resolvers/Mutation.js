import {v4 as uuidv4} from 'uuid';

const Mutation = {
    createUser(parent, args, {db}, info) {
        if (db.users.some(u => u.email === args.data.email)) {
            throw new Error('Email is taken.');
        } else {
            const user = {
                id: uuidv4(),
                ...args.data
            }

            db.users.push(user);
            return user;
        }
    },

    deleteUser(parent, args, {db}, info) {
        const index = db.users.findIndex(u => u.id === args.id);
        if (index >= 0) {

            db.comments = db.comments.filter(c => c.author !== args.id)

            db.posts = db.posts.filter(p => {
                const match = p.author === args.id
                if (match) {
                    db.comments = db.comments.filter(c => c.post !== p.id)
                }
                return !match
            });

            const deletedUsers = db.users.splice(index, 1);

            return deletedUsers[0];
        } else {
            throw new Error('User not found.');
        }
    },

    updateUser(parent, args, {db}, info) {
        const {id,data} = args;
        const user = db.users.find(u => u.id === id)

        if (user) {
            if (typeof data.email === 'string') {
                if (db.users.some(u => u.email === data.email && u.id !== id)) {
                    throw new Error('Email is taken.');
                }
                user.email = data.email
            }

            if (typeof data.name === 'string') {
                user.name = data.name
            }

            if (typeof data.age !== 'undefined') {
                user.age = data.age
            }

            return user

        } else {
            throw new Error('User not found.');
        }
    },

    createPost(parent, args, {db, pubsub}, info) {
        if (db.users.some(u => u.id === args.data.author)) {
            const post = {
                id: uuidv4(),
                ...args.data
            }
            db.posts.push(post)

            if (args.data.published) {
                pubsub.publish('post', { post })
            }

            return post;
        } else {
            throw new Error('User not found.');
        }
    },

    deletePost(parent, args, {db}, info) {
        const index = db.posts.findIndex(p => p.id === args.id)
        if (index >= 0) {
            db.comments = db.comments.filter(c => c.post !== args.id)
            const deletedPosts = db.posts.splice(index, 1);
            return deletedPosts[0];
        } else {
            throw new Error('Post not found.');
        }
    },

    updatePost(parent, args, {db,pubsub}, info) {
         const {id,data} = args
         const post = db.posts.find(p => p.id === id)

         if(post) {
            if (typeof data.title === 'string') {
                post.title = data.title
            }

            if (typeof data.body === 'string') {
                post.body = data.body
            }

            if (typeof data.published === 'boolean') {
                post.published = data.published
            }

            if(data.published) {
                pubsub.publish('post', {post})
            }
            
            return post

         }else{
            throw new Error('Post not found.');
         }
    },

    createComment(parent, args, {db, pubsub}, info) {
        if (db.users.some(u => u.id === args.data.author)) {
            if (db.posts.some(p => p.id === args.data.post && p.published)) {
                const comment = {
                    id: uuidv4(),
                    ...args.data
                }

                db.comments.push(comment);
                pubsub.publish(`comment_${args.data.post}`, { comment })

                return comment;
            } else {
                throw new Error('Post must exist and must be published.');
            }
        } else {
            throw new Error('User not found.');
        }
    },


    deleteComment(parent, args, {db}, info) {
        const index = db.comments.findIndex(c => c.id === args.id)
        if (index >= 0) {
            const deletedComments = db.comments.splice(index, 1);
            return deletedComments[0];
        } else {
            throw new Error('Comment not found.');
        }
    },

    updateComment(parent, args, {db}, info) {
        const {id,data} = args
        const comment = db.comments.find(c => c.id === id)
        if(comment) {
            if (typeof data.text === 'string') {
                comment.text = data.text
            }
            return comment;
        }else{
            throw new Error('Comment not found.');
        }
    }
}

export { Mutation as default }