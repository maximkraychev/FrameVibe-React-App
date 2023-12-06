import { INPUT_NAMES } from "../constants/formInputNaming";

export const LOGIN_FORM_VALIDATIONS = {
    [INPUT_NAMES.EMAIL]: [
        (value) => value !== '' ? null : 'Email is required!',
        (value) => /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value) ? null : 'Email must be a valid email address!'
    ],
    [INPUT_NAMES.PASSWORD]: [
        (value) => value !== '' ? null : 'Password is required!',
        (value) => value.length >= 6 ? null : 'Password must be at least 6 characters!',
        (value) => value.length > 20 ? 'Password cannot be more then 20 characters long!' : null
    ]
}

export const UPLOAD_FORM_VALIDATION = {
    [INPUT_NAMES.UPLOAD_IMAGE]: [
        (value) => value !== '' ? null : 'Image is required!'
    ],
    [INPUT_NAMES.DESCRIPTION]: [
        (value) => value !== '' ? null : 'Description is required!',
        (value) => value.length > 200 ? 'Description cannot be more then 200 characters long!' : null
    ]
}

export const REGISTER_FORM_VALIDATIONS = {
    [INPUT_NAMES.EMAIL]: [
        (value) => value !== '' ? null : 'Email is required!',
        (value) => /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value) ? null : 'Email must be a valid email address!'
    ],
    [INPUT_NAMES.USERNAME]: [
        (value) => value !== '' ? null : 'Username is required!',
        (value) => value.length >= 3 ? null : 'Username must be at least 3 characters long!',
        (value) => value.length > 20 ? 'Username cannot be more then 20 characters long!' : null
    ],
    [INPUT_NAMES.PASSWORD]: [
        (value) => value !== '' ? null : 'Password is required!',
        (value) => value.length >= 6 ? null : 'Password must be at least 6 characters!',
        (value) => value.length > 20 ? 'Password cannot be more then 20 characters long!' : null
    ],
    [INPUT_NAMES.REPASSWORD]: [
        (value) => value !== '' ? null : 'RePassword is required!',
        (value, valueForPassword) => value === valueForPassword ? null : 'Passwords don\'t match!'
    ],
}