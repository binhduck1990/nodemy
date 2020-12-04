const mongoose = require('../config/database')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'title required'],
        maxlength: [10, 'the user maximum 10 character']
    },
    password: {
        type: String,
        required: [true, 'password required'],
        maxlength: [10, 'the password maximum 10 character']
    },
    age: {
        type: Number,
        required: [true, 'age required'],
        min: 1,
        max: 150
    },
    address: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    collection: 'user'
})

module.exports = mongoose.model('user', UserSchema)