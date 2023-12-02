import { API_PATH } from '../constants/paths.js';
import * as api from './api.js';

export const getUserInfo = async (username) => {
    return api.get(API_PATH.USER_FN(username));
}