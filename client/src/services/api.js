import { API_PATH } from "../constants/paths";

async function request(method, path, accessToken, data) {

    const options = {
        method,
        headers: {}
    }

    if (data instanceof FormData) {
        // options.headers['Content-Type'] = 'multipart/form-data';
        options.body = data;
    } else if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    try {
        const response = await fetch(API_PATH.BASE + path, options);

        if (response.ok == false) {

            if (response.status === 401) {                                                                  // If the token is invalid, the server returns 401 (unauthorized) 
                  //TODO                                                                                    // and to prevent a software lock, clear the token from localStorage
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');
const patch = request.bind(null, 'PATCH');

export {
    get,
    post,
    put,
    del as delete,
    patch
}