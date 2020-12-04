require('../Config/database')
const express = require('express')
const Router = express.Router()
const UserController = require('../Controllers/UserController');
const PostController = require('../Controllers/PostController');

// user router api
Router.post('/login', UserController.login)
Router.get('/user', UserController.paginate)
Router.get('/user/:id', UserController.show)
Router.delete('/user/:id', UserController.destroy)
Router.post('/user/', UserController.create)
Router.patch('/user/:id', UserController.update)

// post router api
Router.get('/post', PostController.paginate)
Router.get('/post/:id', PostController.show)
Router.delete('/post/:id', PostController.destroy)
Router.post('/post', PostController.create)
Router.patch('/post/:id', PostController.update)
Router.post('/post/image',  PostController.image)

module.exports = Router