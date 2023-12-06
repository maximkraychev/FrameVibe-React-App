import { Router } from 'express';
import { cloudinary } from '../config/cloudinary.js';
import { multer } from '../config/multer.js'

import { validatePostOnEditSchema, validatePostSchema } from '../util/validationSchemes.js';
import { getSinglePost, getAllUserPosts, createPost, updatePost, deletePost, getAllPosts } from '../services/postService.js';
import { preload } from '../middlewares/preloader.js';
import { isOwner, isUserLogged } from '../middlewares/guards.js';



const postController = Router();


// Run preload every time before isOwner guard !!!


// GET
postController.get('/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params
        const post = await getSinglePost(postId).populate('owner');

        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
});

// GET ALL
postController.get('/', isUserLogged, async (req, res, next) => {
    try {
        //TODO handle not to take all posts. Maybe load only 10 and when user is close to the end load another 10
        const posts = await getAllPosts().populate('owner');

        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
});

// POST
postController.post('/', multer.single('uploadImage'), isUserLogged, async (req, res, next) => {
    try {

        // Getting the description and file using multer
        const postData = { description: req.body.description, uploadImage: req.file }

        // Validating the fields
        await validatePostSchema.validateAsync(postData);

        // This is the way showed in the documentation
        const result = await new Promise((resolve) => {

            cloudinary.uploader.upload_stream({ folder: 'post-images' }, (error, uploadResult) => {
                return resolve(uploadResult)
            }).end(postData.uploadImage.buffer);

        });

        // Set the proper format for database
        const imgDataForDataBase = {
            description: postData.description,
            imageURL: result.secure_url,
            imageId: result.public_id
        }

        // Save to database 
        const newPost = await createPost(imgDataForDataBase, req.user._id);

        // Return the created post
        res.status(201).json(newPost);
    } catch (err) {
        next(err);
    }
});

// PATCH
postController.patch('/:postId', isUserLogged, preload(getSinglePost), isOwner, async (req, res, next) => {
    try {
        await validatePostOnEditSchema.validateAsync(req.body);
        const data = req.body;
        const postId = req.params.postId;

        const editedPost = await updatePost(postId, { description: data.description });

        res.status(200).json(editedPost);
    } catch (err) {
        next(err);
    }
});

// DELETE
// productController.delete('/:productId', preload(getSingleProduct), isOwner, async (req, res, next) => {
//     try {
//         const productId = req.params.productId;
//         const deletedProduct = await deleteProduct(productId);

//         res.status(200).json(deletedProduct);
//     } catch (err) {
//         next(err);
//     }
// });

export { postController };