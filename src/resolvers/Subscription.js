const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0
            
            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count')
        }
    },

    comment: {
        subscribe(parent, args, {db, pubsub}, info) {
            const { postId } = args;
            const post = db.posts.find(p => p.id === postId && p.published)
            if(post) {
                return pubsub.asyncIterator(`comment_${postId}`)
            }else{
                throw new Error('Post must exist and must be published.');
            }
        }
    },

    post: {
        subscribe(parent, args, {pubsub}, info) {
            return pubsub.asyncIterator(`post`)
        }
    }
}

export {Subscription as default}