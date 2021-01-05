const Query = {
    users(parent, args, {db}, info) {
        if (args.query) {
            return db.users.filter(u => u.name.toLowerCase().includes(args.query.toLowerCase()))
        } else {
            return db.users
        }
    }
}

export {Query as default};