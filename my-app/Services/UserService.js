const userModel = require("../Models/User");

findUserById = (id) => {
    return userModel.findById(id)
}

findOneUser = (req) => {
    return userModel.findOne({ username: req.body.username, password: req.body.password })
}

paginate = async (req) => {
    const paginate = {}
    const totalUsers =  await userModel.countDocuments();
    const perPage = req.query.per_page || 5
    const page = req.query.page || 1
    const offset = perPage*page - perPage;
    const users = userModel.find().skip(offset).limit(perPage)
    if(req.query.username){
        users.where('username', new RegExp(req.query.username, "i"))
    }
    if(req.query.age){
        users.where('age', req.query.age)    
    }
    if(req.query.address){
        users.where('address', new RegExp(req.query.address, "i"))
    }

    paginate.users = await users
    paginate.total = totalUsers
    
    return paginate
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
    findOneUser: findOneUser,
    findUserByIdAndRemove: findUserByIdAndRemove,
    createdUser: createdUser,
    findUserByIdAndUpdate: findUserByIdAndUpdate
}