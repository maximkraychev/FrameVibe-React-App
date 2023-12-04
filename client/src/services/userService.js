import { API_PATH } from '../constants/paths.js';
import * as api from './api.js';

export const getUserInfoById = async (userId) => {
    return api.get(API_PATH.USER_BY_ID_FN(userId));
};

export const getUserInfoByUsername = async (username) => {
    return api.get(API_PATH.USER_BY_USERNAME_FN(username));
};