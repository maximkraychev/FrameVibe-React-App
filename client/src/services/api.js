import { API_PATH } from "../constants/paths";

async function request(type, path, data) {

    const options = {
        method: type,
        credentials: 'include',
        headers: {}
    }

    if (data instanceof FormData) {
        // options.headers['Content-Type'] = 'multipart/form-data';
        options.body = data;
    } else if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(API_PATH.BASE + path, options);

        if (response.ok == false) {
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