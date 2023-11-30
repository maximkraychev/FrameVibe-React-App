export const PARAMS = {
    POSTID: 'postId',
    USERNAME: 'username'
}

export const PATH = {
    EXPLORE: '/explore',
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    UPLOAD: '/upload',
    PROFILE: `/profile/:${PARAMS.USERNAME}`,
    POST: `/p/:${PARAMS.POSTID}`,
    POST_DETAILS: `:${PARAMS.POSTID}`,
    NOT_FOUND: '*',
    ACTIVE_POST: (id) => `/p/${id}`,
    ACTIVE_PROFILE: (username) => `/profile/${username}`,
};



export const API_PATH = {
    BASE: 'http://localhost:3000',
    REGISTER: '/users/register',
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    CREATE_POST: '/post',
    USER: '/users'
}