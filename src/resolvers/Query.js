const Query = {
    users(parent, args, {db, prisma}, info) {
        return prisma.query.users(null, info)
    },
    books(parent, args, {db, prisma}, info) {
        return prisma.query.books(null, info)
    },
    reviews(parent, args, {db, prisma}, info) {
        return prisma.query.reviews(null, info)
    }
}

export {Query as default};