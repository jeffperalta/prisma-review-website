const Subscription = {
    user: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator(`user`)
        }
    }
}

export {Subscription as default}