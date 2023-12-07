import * as api from './api.js';
import { API_PATH } from '../constants/paths.js';

export const createPost = async (data) => {
    return api.post(API_PATH.CREATE_POST, data);
}

export const getAllUserPosts = async (userId) => {
    return api.get(API_PATH.USER_POSTS_FN(userId));
}

export const getSinglePost = async (postId) => {
    return api.get(API_PATH.SINGLE_POST_FN(postId));
}

export const getAllPosts = async () => {
    return api.get(API_PATH.ALL_POSTS);
}

export const updatePost = async (postId, post) => {
    return api.patch(API_PATH.UPDATE_POST_FN(postId), post);
}

export const deletePost = async (postId) => {
    return api.delete(API_PATH.DELETE_POST_FN(postId));
}