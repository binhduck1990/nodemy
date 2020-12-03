const postModel = require("../models/post")

findPostById = (id) => {
    return postModel.findById(id)
}

paginate = (req) => {
    const perPage = req.query.per_page || 5
    const page = req.query.page || 1
    const offset = perPage*page - perPage;
    const condition = {}
    if(req.query.title){
        condition.title = {
            $regex: new RegExp(req.query.title),
            $options: "i"
        }
    }
    if(req.query.description){
        condition.description = {
            $regex: new RegExp(req.query.description),
            $options: "i"
        }
    }
    return postModel.paginate(condition, {offset: offset, limit: perPage})
}

findPostByIdAndRemove = (id) => {
    return postModel.findByIdAndRemove(id)
}

createdPost = (req) => {
    return postModel.create({
        title: req.body.title,
        description: req.body.description
    })
}

findPostByIdAndUpdate = (req) => {
    return postModel.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title
        }
    },{new: true})
}

module.exports = {
    paginate: paginate,
    createdPost: createdPost,
    findPostById: findPostById,
    findPostByIdAndRemove: findPostByIdAndRemove,
    findPostByIdAndUpdate: findPostByIdAndUpdate
}