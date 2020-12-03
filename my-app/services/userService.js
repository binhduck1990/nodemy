const userModel = require("../models/user");
findUserById = (id) => {
    return userModel.findById(id)
}

module.exports = {
    findUserById: findUserById
}