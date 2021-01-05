const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                },{
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    books(parent, args, { prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    author_contains: args.query
                }, {
                    isbn: args.query
                }]
            }
        }

        return prisma.query.books(opArgs, info)
    },
    reviews(parent, args, { prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    text_contains: args.query
                }, {
                    author: {
                        name_contains: args.query
                    }
                }, {
                    rating: +args.query
                }]
            }
        }


        return prisma.query.reviews(opArgs, info)
    }
}

export {Query as default};