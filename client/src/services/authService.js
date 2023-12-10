import { API_PATH } from '../constants/paths.js';
import * as api from './api.js';

export const registerService = async (accessToken, data) => {
    return api.post(API_PATH.REGISTER, accessToken, data);
}

export const loginService = async (accessToken, data) => {
    return api.post(API_PATH.LOGIN, accessToken, data);
}

export const logoutService = async () => {
    return api.get(API_PATH.LOGOUT);
}