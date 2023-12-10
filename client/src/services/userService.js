import { API_PATH } from '../constants/paths.js';
import * as api from './api.js';

export const getUserInfoById = async (userId) => {
    return api.get(API_PATH.USER_BY_ID_FN(userId));
};

export const getUserInfoByUsername = async (username, accessToken) => {
    return api.get(API_PATH.USER_BY_USERNAME_FN(username));
};

export const getUserInfoByEmail = async (email) => {
    return api.get(API_PATH.USER_BY_EMAIL_FN(email));
}