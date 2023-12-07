export const PARAMS = {
    POSTID: 'postId',
    USERNAME: 'username'
}

export const PATH = {
    EXPLORE: '/explore',
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    POST_CREATE: '/create-post',
    PROFILE: `/profile/:${PARAMS.USERNAME}`,
    POST: `/p/:${PARAMS.POSTID}`,
    POST_EDIT: `/p/:${PARAMS.POSTID}/edit`,
    POST_DETAILS: `:${PARAMS.POSTID}`,
    NOT_FOUND: '*',
    POST_FN: (id) => `/p/${id}`,
    POST_EDIT_FN: (id) => `/p/${id}/edit`,
    PROFILE_FN: (username) => `/profile/${username}`,
    PROFILE_OPEN_POST_FN: (username, postId) => `/profile/${username}/${postId}`
};



export const API_PATH = {
    BASE: 'http://localhost:3000',
    REGISTER: '/users/register',
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    CREATE_POST: '/post',
    USER_BY_ID_FN: (userId) => `/users/${userId}`,
    USER_BY_USERNAME_FN: (username) => `/users/${username}/username`,
    USER_BY_EMAIL_FN: (email) => `/users/${email}/email`,
    USER_POSTS_FN: (id) => `/users/${id}/posts`,
    SINGLE_POST_FN: (postId) => `/post/${postId}`,
    ALL_POSTS: '/post',
    UPDATE_POST_FN: (postId) => `/post/${postId}`,
}