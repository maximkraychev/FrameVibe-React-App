import * as api from './api.js';
import { API_PATH } from '../constants/paths.js';

export const createPost = async (data) => {
    return api.post(API_PATH.CREATE_POST, data);
}