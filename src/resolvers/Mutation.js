import {v4 as uuidv4} from 'uuid'
import { hasDuplicate, validInput } from '../utils/util'

const Mutation = {
    createUser(parent, args, {db, pubsub}, info) {
        if (hasDuplicate(db.users, "email", args.data.email)) {
            throw new Error("Email taken")
        }

        if (hasDuplicate(db.users, "username", args.data.username)) {
            throw new Error("Username taken")
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        pubsub.publish('user', {
            user: {
                mutation: 'CREATED',
                data: user
            }
        })

        return user
    },

    updateUser(parent, args, {db, pubsub}, info) {
        const {id, data} = args

        const user = db.users.find(u => u.id === id)

        if(user) {
            if (validInput(data.email)) {
                if (hasDuplicate(db.users, "email", data.email, id)) {
                    throw new Error("Email taken")
                }
                user.email = data.email
            }
            
            if (validInput(data.username)) {
                if (hasDuplicate(db.users, "username", data.username, id)) {
                    throw new Error("Username taken")
                }
                user.username = data.username
            }
            
            if(validInput(data.name)) {
                user.name = data.name
            }

            if (validInput(data.age, "number")) {
                user.age = data.age
            }

            pubsub.publish('user', {
                user: {
                    mutation: 'UPDATED',
                    data: user
                }
            })

            return user

        }else {
            throw new Error("User not found")
        }
        
    },

    deleteUser(parent, args, {db, pubsub}, info) {
        const index = db.users.findIndex(u => u.id === args.id)

        if (index >= 0) {

            const [user] = db.users.splice(index, 1)

            pubsub.publish('user', {
                user: {
                    mutation: 'DELETED',
                    data: user
                }
            })
            
            return user

        }else{
            throw new Error("User not found")
        }
    }
}

export { Mutation as default }