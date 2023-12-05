import { INPUT_NAMES } from "../constants/formInputNaming";

export const LOGIN_FORM_VALIDATIONS = {
    [INPUT_NAMES.EMAIL]: [
        (value) => value !== '' ? null : 'Email is required!'
    ],
    [INPUT_NAMES.PASSWORD]: [
        (value) => value !== '' ? null : 'Password is required!'
    ]
}

export const UPLOAD_FORM_VALIDATION = {
    [INPUT_NAMES.UPLOAD_IMAGE]: [
        (value) => value !== '' ? null : 'Image is required!'
    ],
    [INPUT_NAMES.DESCRIPTION]: [
        (value) => value !== '' ? null : 'Description is required!'
    ]
}

export const REGISTER_FORM_VALIDATIONS = {
    [INPUT_NAMES.EMAIL]: [
        (value) => value !== '' ? null : 'Email is required!'
    ],
    [INPUT_NAMES.USERNAME]: [
        (value) => value !== '' ? null : 'Username is required!'
    ],
    [INPUT_NAMES.PASSWORD]: [
        (value) => value !== '' ? null : 'Password is required!',
        (value) => value.length >= 6 ? null : 'Password must be at least six characters!'
    ],
    [INPUT_NAMES.REPASSWORD]: [
        (value) => value !== '' ? null : 'RePassword is required!'
    ],
}