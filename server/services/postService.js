import { Post } from '../models/Post.js';

// GET ONE
const getSinglePost = (postId) => Post.findById(postId);

// GET ALL
const getAllUserPosts = (userId) => Post.find({ owner: userId });

// CREATE 
const createPost = (product, userId) => Post.create({ ...product, owner: userId });

// UPDATE
const updatePost = (productId, product) => Post.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

// DELETE 
const deletePost = (productId) => Post.findByIdAndDelete(productId, { returnDocument: true });

export {
    getSinglePost,
    getAllUserPosts,
    createPost,
    updatePost,
    deletePost,
};