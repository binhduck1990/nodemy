const userModel = require("../models/user");

findUserById = (id) => {
    return userModel.findById(id)
}

paginate = (req) => {
    const perPage = req.query.per_page || 5
    const page = req.query.page || 1
    const offset = perPage*page - perPage;
    const condition = {}
    if(req.query.username){
        condition.username = {
            $regex: new RegExp(req.query.username),
            $options: "i"
        }
    }
    return userModel.paginate(condition, {offset: offset, limit: perPage})
}

findUserByIdAndRemove = (id) => {
    return userModel.findByIdAndRemove(id)
}

createdUser = (req) => {
    return userModel.create({
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address
    })
}

findUserByIdAndUpdate = (req) => {
    return userModel.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username
        }
    },{new: true})
}

module.exports = {
    paginate: paginate,
    findUserById: findUserById,
    findUserByIdAndRemove: findUserByIdAndRemove,
    createdUser: createdUser,
    findUserByIdAndUpdate: findUserByIdAndUpdate
}