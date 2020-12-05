const postModel = require("../Models/Post")

findPostById = (id) => {
    return postModel.findById(id)
}

paginate = async (req) => {
    const paginate = {}
    const perPage = req.query.per_page || 5
    const page = req.query.page || 1
    const offset = perPage*page - perPage;
    const postQuery = postModel.find({}).skip(offset).limit(perPage)
    if(req.query.title){
        postQuery.where('title', new RegExp(req.query.title, "i"))
    }
    if(req.query.description){
        postQuery.where('description', new RegExp(req.query.description, "i"))
    }
   
    const [posts, totalPost] = await Promise.all([postQuery.exec(), postModel.countDocuments().exec()])

    paginate.posts = posts
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