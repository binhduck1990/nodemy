const postModel = require("../models/post")

findPostById = (id) => {
    return postModel.findById(id)
}

paginate = async (req) => {
    const paginate = {}
    const totalPost = await postModel.countDocuments()
    const perPage = req.query.per_page || 5
    const page = req.query.page || 1
    const offset = perPage*page - perPage;
    const posts = postModel.find({}).skip(offset).limit(perPage)
    if(req.query.title){
        posts.where('title', new RegExp(req.query.title, "i"))
    }
    if(req.query.description){
        posts.where('description', new RegExp(req.query.description, "i"))
    }

    paginate.posts = await posts
    paginate.total = totalPost
    return paginate
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