import { Post } from '../models/Post.js';

// GET ONE
const getSinglePost = (postId) => Post.findById(postId);

// GET ALL BY USER
const getAllUserPosts = (userId) => Post.find({ owner: userId });

// GET ALL 
const getAllPosts = () => Post.find({});

// CREATE 
const createPost = (product, userId) => Post.create({ ...product, owner: userId });

// UPDATE
const updatePost = (postId, post) => Post.findByIdAndUpdate(postId, { $set: post }, { runValidators: true, new: true });

// DELETE 
const deletePost = (postId) => Post.findByIdAndDelete(postId, { returnDocument: true });

// PUT
const updatePostPut = (postId, post) => Post.findByIdAndUpdate(postId, post, { runValidators: true, new: true });

export {
    getSinglePost,
    getAllUserPosts,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    updatePostPut
};