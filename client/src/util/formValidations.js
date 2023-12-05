import { INPUT_NAMES } from "../constants/formInputNaming";

export const LOGIN_FORM_VALIDATIONS = {
    [INPUT_NAMES.EMAIL]: [
        (value) => value !== '' ? null : 'Email is required!'
    ],
    [INPUT_NAMES.PASSWORD]: [
        (value) => value !== '' ? null : 'Password is required!'
    ]
}