import * as api from './api.js';

export const registerService = async (data) => {
    return api.post('/users/register', data);
}