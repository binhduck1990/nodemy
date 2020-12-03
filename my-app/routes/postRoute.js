const express = require('express')
const multer = require('multer')
const postRouter = express.Router()
const postService = require('../services/postService')
const createdPostValidator = require('../validators/createdPostValidator')

// get all post with pagination
postRouter.get('/', async (req, res) => {
    try{
        const posts = await postService.paginate(req)
        res.status(200).json(posts)
    }catch (error) {
        res.status(404).json({message: error})
    }
})

// get a post detail
postRouter.get('/:id', async (req, res) => {
    try{
        const post = await postService.findPostById(req.params.id)
        if(!post){
            return res.status(404).json({message: 'post not found'})
        }
        res.status(200).json(post)
    }catch (error) {
        if (error.kind === "ObjectId") {
            res.status(404).json({message: 'post not found'});
        }else{
            res.status(404).json(error)
        }
    }
})

// delete a post
postRouter.delete('/:id', async (req, res) => {
    try{
        const removedPost = await postService.findPostByIdAndRemove(req.params.id)
        if(!removedPost){
            return res.status(404).json({message: 'post not found'})
        }
        res.json(removedPost)
    }catch (error) {
        if (error.kind === "ObjectId") {
            res.status(404).json({message: 'post not found'});
        }else{
            res.status(404).json(error)
        }
    }
})

// create a post
postRouter.post('', async (req, res) => {
    const validatedData = createdPostValidator.validate(req)
    if(Object.getOwnPropertyNames(validatedData).length !== 0){
        return res.status(404).json({message: validatedData})
    }
    try {
        const createdPost = await postService.createdPost(req)
        res.status(201).json(createdPost)
    }catch (error) {
        res.status(404).json({message: error})
    }
})

// update a post
postRouter.patch('/:id', async (req, res) => {
    try{
        const updatedPost = await postService.findPostByIdAndUpdate(req)
        if(!updatedPost){
            return res.status(404).json({message: 'post not found'})
        }
        res.json(updatedPost)
    }catch (error) {
        if (error.kind === "ObjectId") {
            res.status(404).json({message: 'post not found'});
        }else{
            res.status(404).json(error)
        }
    }
})

// Storage images
postRouter.post('/image',  (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/Users/binh/Codes/my-app/images')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.originalname + '-' + uniqueSuffix)
        }
    })
    const upload = multer({ storage: storage}).array('avatar', 2)

    upload(req, res, function(error) {
        if (!req.files) {
            res.send('Please select an image to upload');
        } else if (error instanceof multer.MulterError) {
            res.send(error);
        }
    })
    res.send('create success')
})

module.exports = postRouter

