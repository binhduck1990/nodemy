const postModel = require('../Models/Post')

validate = (req) => {
    const listError = {}
    const title = req.body.title
    const description = req.body.description
    const post = new postModel({
        title: title,
        description: description
    })
    const err = post.validateSync()
    if(!!err){
        Object.keys(err.errors).forEach((key) => {
            listError[key] = err.errors[key].message
        });
    }
    return listError
}

module.exports = {
    validate: validate
}