const postModel = require('../Models/Post')

validate = (req) => {
    const listError = {}
    const post = new postModel({
        title: req.body.title,
        description: req.body.description
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