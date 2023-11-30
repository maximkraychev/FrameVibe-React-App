import { API_PATH } from '../constants/paths.js';
import * as api from './api.js';

export const getUserInfo = async (username) => {
    console.log(username);
    return api.get(`${API_PATH.USER}/${username}`);
}