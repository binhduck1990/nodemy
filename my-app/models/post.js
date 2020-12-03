const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title required'],
        maxlength: [10, 'the title maximum 10 character']
    },
    description: {
        type: String,
        maxlength: [10, 'the description maximum 10 character']
    },
    date: {
        type: Date,
        default: Date.now
    }
})

PostSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('post', PostSchema)