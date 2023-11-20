import { API_PATH } from "../constants/paths";

async function request(type, path, data) {

    const options = {
        method: type,
        headers: {}
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    //TODO logic for sending token
    // const token = getUserData()?.accessToken;
    // if (token) {
    //     options.headers['X-Authorization'] = token;
    // }

    try {
        const response = await fetch(API_PATH.BASE + path, options);

        if (response.ok == false) {
            //TODO add logic for clearing local user state 
            // if (response.status == 403) {
            //     clearUserData();
            // }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        //TODO handle the error;
        alert(err.message);
        // throw err;
    }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export {
    get,
    post,
    put,
    del as delete 
}