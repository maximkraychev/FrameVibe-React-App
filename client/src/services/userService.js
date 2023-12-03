import { API_PATH } from '../constants/paths.js';
import * as api from './api.js';

export const getUserInfoByUsernameOrId = async (userIdentifier) => {
    return api.get(API_PATH.USER_FN(userIdentifier));
};