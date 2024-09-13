const mongoose = require("mongoose")

const usersSchema =  new mongoose.Schema({
        firstname: {
            required: true,
            type: String,
        },
        lastname: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            type: String,
        },
        password: {
            required: true,
            type: String,
        },
        createdAt: {
            default: new Date(),
            required: false
        }
})


const UserSchema = mongoose.model("users", usersSchema)

module.exports = UserSchema