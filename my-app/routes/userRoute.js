const { json } = require('body-parser')
const express = require('express')
const userRouter = express.Router()
const userService = require('../services/userService')
const createdUserValidator = require('../validators/createdUserValidator')

// get all user with pagination
userRouter.get('/', async (req, res) => {
    try {
        const users = await userService.paginate(req)
        res.status(200).json({message: 'success', data: users})
    } catch (error) {
        res.status(404).json({message: error})
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
userRouter.post('', async (req, res) => {
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