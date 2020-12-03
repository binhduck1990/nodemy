const express = require('express')
const multer = require('multer')
const postRouter = express.Router()
const postService = require('../services/postService')
const createdPostValidator = require('../validators/createdPostValidator')

// get all post
postRouter.get('/', async (req, res) => {
    try{
        const posts = await postService.paginate(req)
        res.status(200).json(posts)
    }catch (err) {
        res.status(404).json({message: err})
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
    }catch (err) {
        if (err.kind === "ObjectId") {
            res.status(404).json({message: 'post not found'});
        }else{
            res.status(404).json(err)
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
    }catch (err) {
        if (err.kind === "ObjectId") {
            res.status(404).json({message: 'post not found'});
        }else{
            res.status(404).json(err)
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
    }catch (err) {
        res.status(404).json({message: err})
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
    }catch (err) {
        if (err.kind === "ObjectId") {
            res.status(404).json({message: 'post not found'});
        }else{
            res.status(404).json(err)
        }
    }
})

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

    upload(req, res, function(err) {
        if (!req.files) {
            res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            res.send(err);
        }
    })
    res.send('create success')
})

module.exports = postRouter

