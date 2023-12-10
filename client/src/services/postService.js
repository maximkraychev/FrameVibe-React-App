import * as api from './api.js';
import { API_PATH } from '../constants/paths.js';

export const createPost = async (accessToken, data) => {
    return api.post(API_PATH.CREATE_POST, accessToken, data);
}

export const getAllUserPosts = async (userId, accessToken) => {
    return api.get(API_PATH.USER_POSTS_FN(userId), accessToken);
}

export const getSinglePost = async (postId, accessToken) => {
    return api.get(API_PATH.SINGLE_POST_FN(postId, accessToken));
}

export const getAllPosts = async (accessToken) => {
    return api.get(API_PATH.ALL_POSTS, accessToken);
}

export const updateDetailsPost = async (postId, accessToken, post) => {
    return api.patch(API_PATH.UPDATE_POST_FN(postId), accessToken, post);
}

export const deletePost = async (postId, accessToken) => {
    return api.delete(API_PATH.DELETE_POST_FN(postId), accessToken);
}

export const likePost = async (postId, accessToken) => {
    return api.put(API_PATH.ADD_LIKE_POST_FN(postId), accessToken);
}

export const dislikePost = async (postId, accessToken) => {
    return api.put(API_PATH.DISLIKE_POST_FN(postId), accessToken);
}