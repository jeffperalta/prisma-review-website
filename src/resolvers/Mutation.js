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
    createPost(parent, args, {db}, info) {
        if (db.users.some(u => u.id === args.data.author)) {
            const post = {
                id: uuidv4(),
                ...args.data
            }
            db.posts.push(post)
            return post;
        } else {
            throw new Error('User not found.');
        }
    },
    createComment(parent, args, {db}, info) {
        if (db.users.some(u => u.id === args.data.author)) {
            if (db.posts.some(p => p.id === args.data.post && p.published)) {
                const comment = {
                    id: uuidv4(),
                    ...args.data
                }

                db.comments.push(comment);
                return comment;
            } else {
                throw new Error('Post must exist and must be published.');
            }
        } else {
            throw new Error('User not found.');
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
    deleteComment(parent, args, {db}, info) {
        const index = db.comments.findIndex(c => c.id === args.id)
        if (index >= 0) {
            const deletedComments = db.comments.splice(index, 1);
            return deletedComments[0];
        } else {
            throw new Error('Comment not found.');
        }
    }
}

export { Mutation as default }