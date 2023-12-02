import { Router } from 'express';
import { cloudinary } from '../config/cloudinary.js';
import { multer } from '../config/multer.js'

import { validatePostSchema } from '../util/validationSchemes.js';
import { getSinglePost, getAllUserPosts, createPost, updatePost, deletePost } from '../services/postService.js';
import { preload } from '../middlewares/preloader.js';
import { isOwner } from '../middlewares/guards.js';



const postController = Router();


// Run preload every time before isOwner guard !!!


// GET
// productController.get('/:productId', preload(getSingleProduct), isOwner, async (req, res, next) => {
//     try {
//         const product = await getSingleProduct(req.params.productId);

//         res.status(200).json(product);
//     } catch (err) {
//         next(err);
//     }
// });

// GET ALL
// productController.get('/', async (req, res, next) => {
//     try {
//         const products = await getAllProducts(req.user._id);

//         res.status(200).json(products);
//     } catch (err) {
//         next(err);
//     }
// });

// POST
postController.post('/', multer.single('uploadImage'), async (req, res, next) => {
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

// PUT
// productController.put('/:productId', preload(getSingleProduct), isOwner, async (req, res, next) => {
//     try {
//         await validateProductSchema.validateAsync(req.body);
//         const productId = req.params.productId;
//         const editedProduct = await updateProduct(productId, req.body);

//         res.status(200).json(editedProduct);
//     } catch (err) {
//         next(err);
//     }
// });

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