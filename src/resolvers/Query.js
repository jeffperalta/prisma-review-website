const Query = {
    id() {
        return 'abc123'
    },
    name() {
        return 'Jeff'
    },
    age() {
        return 35
    },
    employed() {
        return true
    },
    gpa() {
        return null
    },
    book() {
        return {
            title: 'Title of the book',
            price: 12.50,
            releaseYear: 2008,
            rating: 4.5,
            inStock: true
        }
    },
    user(parent, args, {db}, info) {
        return {
            id: '123123',
            name: 'Romina',
            email: 'romina@gg.com'
        }
    },
    post(parent, args, {db}, info) {
        return {
            id: '123123-A',
            title: 'Title of the post',
            body: 'Body of the post',
            published: true
        }
    },
    greeting(parent, args, {db}, info) {
        if (args['name']) {
            return "Hello, " + args['name'] + "!"
        } else {
            return "Hello!"
        }
    },
    add(parent, args, {db}, info) {
        return args.a + args.b;
    },
    addition(parent, args, {db}, info) {
        if (args.nums.length === 0) return 0;
        return args.nums.reduce((a, b) => a + b, 0);
    },
    grades(parent, args, {db}, info) {
        return [1, 2, 3, 4, 5]
    },
    posts(parent, args, {db}, info) {
        if (args.query) {
            return db.posts.filter(p =>
                p.title.toLowerCase().includes(args.query.toLowerCase()) ||
                p.body.toLowerCase().includes(args.query.toLowerCase())
            )
        } else {
            return db.posts
        }

    },
    users(parent, args, {db}, info) {
        if (args.query) {
            return db.users.filter(u => u.name.toLowerCase().includes(args.query.toLowerCase()))
        } else {
            return db.users
        }
    },
    comments(parent, args, {db}, info) {
        return db.comments;
    }
}

export {Query as default};