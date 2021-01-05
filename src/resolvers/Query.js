const Query = {
    users(parent, args, { prisma }, info) {
        return prisma.query.users(null, info)
    },
    books(parent, args, { prisma }, info) {
        return prisma.query.books(null, info)
    },
    reviews(parent, args, { prisma }, info) {
        return prisma.query.reviews(null, info)
    }
}

export {Query as default};