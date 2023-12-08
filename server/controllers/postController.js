import { Router } from 'express';
import { cloudinary } from '../config/cloudinary.js';
import { multer } from '../config/multer.js'

import { validatePostOnEditSchema, validatePostSchema } from '../util/validationSchemes.js';
import { getSinglePost, createPost, updatePost, deletePost, getAllPosts, updatePostPut } from '../services/postService.js';
import { preload } from '../middlewares/preloader.js';
import { isOwner, isUserLogged, notOwner } from '../middlewares/guards.js';



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
        const newPost = await (await createPost(imgDataForDataBase, req.user._id)).populate('owner');

        // Return the created post
        res.status(201).json(newPost);
    } catch (err) {
        next(err);
    }
});

// PATCH DESCRIPTION
postController.patch('/:postId', isUserLogged, preload(getSinglePost), isOwner, async (req, res, next) => {
    try {
        await validatePostOnEditSchema.validateAsync(req.body);
        const data = req.body;
        const postId = req.params.postId;

        const editedPost = await updatePost(postId, { description: data.description }).populate('owner');

        res.status(200).json(editedPost);
    } catch (err) {
        next(err);
    }
});

// DELETE
postController.delete('/:postId', isUserLogged, preload(getSinglePost), isOwner, async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = res.locals.preload;

        // Deleting the post image
        const deletedPostImageState = await new Promise((resolve) => {             //{ result: 'ok' }
            cloudinary.uploader.destroy(post.imageId)
                .then(result => resolve(result))
        });

        // Check if image is deleted and delete post from database
        if (deletedPostImageState.result == 'ok') {
            const deletedProduct = await deletePost(postId);
            res.status(200).json(deletedProduct);
        } else {
            throw new Error('Oops! Something went wrong while trying to delete the image.Please try again later or contact support for assistance.')
        }

    } catch (err) {
        next(err);
    }
});

// LIKE
postController.put('/:postId/like', isUserLogged, preload(getSinglePost), notOwner, async (req, res, next) => {
    try {
        const user = req.user;
        const post = res.locals.preload;

        // Check if the current user have already like this post;
        if (post.likes.includes(user._id)) {
            res.status(403).json({ message: 'Oops! It seems you\'ve already liked this post' });
            return;
        }

        post.likes.push(user._id);

        const updatedPost = await updatePostPut(post._id, post).populate('owner');
        res.status(200).json(updatedPost);
    } catch (err) {
        next(err);
    }

});

// DISLIKE

postController.put('/:postId/dislike', isUserLogged, preload(getSinglePost), notOwner, async (req, res, next) => {
    try {
        const user = req.user;
        const post = res.locals.preload;
    
        // Remove the userId from likes
        post.likes = post.likes.filter(id => id.toString() !== user._id.toString());

        const updatedPost = await updatePostPut(post._id, post).populate('owner');
        res.status(200).json(updatedPost);
    } catch (err) {
        next(err);
    }

});

export { postController };