const mongoose = require('../config/database')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'title required'],
        maxlength: [10, 'the user maximum 10 character']
    },
    password: {
        type: String,
        maxlength: [10, 'the password maximum 10 character']
    },
    age: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    collection: 'user'
})

UserSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('user', UserSchema)