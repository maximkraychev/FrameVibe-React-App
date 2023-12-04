import { Post } from '../models/Post.js';

// GET ONE
const getSinglePost = (postId) => Post.findById(postId).populate('owner');

// GET ALL BY USER
const getAllUserPosts = (userId) => Post.find({ owner: userId });

// GET ALL 
const getAllPosts = () => Post.find({}).populate('owner');

// CREATE 
const createPost = (product, userId) => Post.create({ ...product, owner: userId });

// UPDATE
const updatePost = (productId, product) => Post.findByIdAndUpdate(productId, product, { runValidators: true, new: true });

// DELETE 
const deletePost = (productId) => Post.findByIdAndDelete(productId, { returnDocument: true });

export {
    getSinglePost,
    getAllUserPosts,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
};