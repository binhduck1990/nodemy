const { json } = require('body-parser')
const express = require('express')
const userRouter = express.Router()
const userService = require('../services/userService')
const createdUserValidator = require('../validators/createdUserValidator')
const path = require('path');

// get all user with pagination
userRouter.get('/', async (req, res) => {
    try {
        const paginate = await userService.paginate(req)
        res.status(200).json({message: 'success', data: paginate.users, total: paginate.total})
    } catch (error) {
        res.status(404).json({message: error})
    }
})

// render login html
userRouter.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"))
})

// handle form html
userRouter.post('/login', async (req, res) => {
    try {
        const user = await userService.findOneUser(req)
        if(!user){
            return res.redirect('/api/user/login')
        }
        res.sendFile(path.join(__dirname, "../views/home.html"))     
    } catch (error) {
        res.redirect(path.join(__dirname, "../views/403.html"));
    }
})

// get a user detail
userRouter.get('/:id', async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id)
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        res.status(200).json({message: 'success', data: user})
    } catch (error) {
        res.status(404).json({message: error})
    }
})

// delete a user
userRouter.delete('/:id', async (req, res) => {
    try {
        const removedUser = userService.findUserByIdAndRemove(req.params.id)
        if(!removedUser){
            return res.status(404).json({message: 'user not found'})
        }
        res.status(200).json({message: 'success', data: removedUser})
    } catch (error) {
        res.status(404).json({message: error})
    }
})

// create a user
userRouter.post('/', async (req, res) => {
    const validatedData = createdUserValidator.validate(req)
    if(Object.getOwnPropertyNames(validatedData).length !== 0){
        return res.status(404).json({message: validatedData})
    }
    try {
        const createdUser = await userService.createdUser(req)
        res.status(201).json({message: 'success', data: createdUser})
    }catch (error) {
        res.status(404).json({message: error})
    }
})

// update a user
userRouter.patch('/:id', async (req, res) => {
    try{
        const updatedUser = await userService.findUserByIdAndUpdate(req)
        if(!updatedUser){
            return res.status(404).json({message: 'user not found'})
        }
        res.status(200).json({message: 'success', data: updatedUser})
    }catch (error) {
        if (error.kind === "ObjectId") {
            res.status(404).json({message: 'user not found'});
        }else{
            res.status(404).json(error)
        }
    }
})

module.exports = userRouter