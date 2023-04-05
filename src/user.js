const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 15,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        min: 8,
        max: 50,
        required: true,
        trim: true,
        email: {
            unique: true,
            type: String,
            required: true,
            trim: true,
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    token: {
        type: String,
    },
    userType: {
        type: String,
        enum: ['User', "Admin"],
        default: 'User'
    }
})

module.exports = mongoose.model('User', schema) //pokeUser is the name of the collection in the db