const multer = require('multer')
const postService = require('../Services/PostService')
const createdPostValidator = require('../Validators/CreatedPostValidator')

// posts paginate
paginate = async (req, res) => {
    try {
        const paginate = await postService.paginate(req)
        res.status(200).json({message: 'success', data: paginate.posts, total: paginate.total})
    } catch (error) {
        res.status(404).json({message: error})
    }
}

// get post detail
show = async (req, res) => {
    try {
        const post = await postService.findPostById(req.params.id)
        if(!post){
            return res.status(404).json({message: 'post not found'})
        }
        res.status(200).json({message: 'success', data: post})
    } catch (error) {
        res.status(404).json({message: error})
    }
}

// remove post
destroy = async (req, res) => {
    try {
        const removedPost = postService.findPostByIdAndRemove(req.params.id)
        if(!removedPost){
            return res.status(404).json({message: 'post not found'})
        }
        res.status(200).json({message: 'success', data: removedPost})
    } catch (error) {
        res.status(404).json({message: error})
    }
}

// create post
create = async (req, res) => {
    const validatedData = createdPostValidator.validate(req)
    if(Object.getOwnPropertyNames(validatedData).length !== 0){
        return res.status(404).json({message: validatedData})
    }
    try {
        const createdPost = await postService.createdPost(req)
        res.status(201).json({message: 'success', data: createdPost})
    }catch (error) {
        res.status(404).json({message: error})
    }
}

// update post
update = async (req, res) => {
    try{
        const updatedPost = await postService.findPostByIdAndUpdate(req)
        if(!updatedPost){
            return res.status(404).json({message: 'post not found'})
        }
        res.status(200).json({message: 'success', data: updatedPost})
    }catch (error) {
        if (error.kind === "ObjectId") {
            res.status(404).json({message: 'post not found'});
        }else{
            res.status(404).json(error)
        }
    }
}

//create image
image = async (req, res) => {
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
}

module.exports = {
    paginate: paginate,
    login: login,
    show: show,
    destroy: destroy,
    create: create,
    update: update,
    image: image
}