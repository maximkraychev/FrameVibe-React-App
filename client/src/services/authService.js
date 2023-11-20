import { API_PATH } from '../constants/paths.js';
import * as api from './api.js';

export const registerService = async (data) => {
    return api.post(API_PATH.REGISTER, data);
}

export const loginService = async (data) => {
    return api.post(API_PATH.LOGIN, data);
}