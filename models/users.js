const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  
        
    },
    createdAt: {
        type: Date,
        default: Date.now,  
    },
});

// Model creation
const UserSchema = mongoose.model("users", usersSchema);

module.exports = UserSchema;
