import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';
import { useForm } from '../../../hooks/useForm';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { submitBtnStateCheck } from '../../../util/submitBtnStateCheck';
import { getUserInfoByEmail, getUserInfoByUsername } from '../../../services/userService';
import { REGISTER_FORM_VALIDATIONS } from '../../../util/formValidations';
import { PATH } from '../../../constants/paths';
import { INPUT_BASE, INPUT_NAMES } from '../../../constants/formInputNaming';

import styles from './Register.module.css';
import { SubmitBtn } from '../../SubmitBtn/SubmitBtn';


const initialValues = {
    [INPUT_NAMES.EMAIL]: '',
    [INPUT_NAMES.USERNAME]: '',
    [INPUT_NAMES.PASSWORD]: '',
    [INPUT_NAMES.REPASSWORD]: '',
    [INPUT_NAMES.USER_AVATAR]: INPUT_BASE.USER_BASE_AVATAR_URL
}

export const Register = () => {

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const { values, changeHandler, onSubmit } = useForm(initialValues, onRegisterSubmit)
    const { errorMessages, checkFieldForError } = useFormValidation(initialValues, REGISTER_FORM_VALIDATIONS);
    const [submitButtonState, setSubmitButtonState] = useState(submitBtnStateCheck(values, errorMessages));

    useEffect(() => {
        setSubmitButtonState(submitBtnStateCheck(values, errorMessages));
    }, [values, errorMessages]);

    const timeouts = useRef({
        [INPUT_NAMES.EMAIL]: null,
        [INPUT_NAMES.USERNAME]: null
    });

    async function onRegisterSubmit(data) {
        const { repassword, ...userDataForServer } = data;
        await register(userDataForServer)
        navigate(PATH.EXPLORE);
        //TODO handle error
    }

    function onInputChange(e) {
        changeHandler(e);
        const value = e.target.value;
        const name = e.target.name;

        // In case of Email we need to make async request
        if (name == INPUT_NAMES.EMAIL) {
            if (timeouts[INPUT_NAMES.EMAIL]) clearTimeout(timeouts[INPUT_NAMES.EMAIL]);

            timeouts[INPUT_NAMES.EMAIL] = checkFieldForError(name, value, { async: getUserInfoByEmail, error: 'This email is already taken!' });
        }

        // In case of Username we need to make async request
        if (name == INPUT_NAMES.USERNAME) {

            if (timeouts[INPUT_NAMES.USERNAME]) clearTimeout(timeouts[INPUT_NAMES.USERNAME]);

            timeouts[INPUT_NAMES.USERNAME] = checkFieldForError(name, value, { async: getUserInfoByUsername, error: 'This username is already taken!' })
        }

        // In case of rePassword we need to give also the current password
        if (name == INPUT_NAMES.REPASSWORD) {
            checkFieldForError(name, value, { passwordRef: values[INPUT_NAMES.PASSWORD] });
            return;
        }

        // If we have error for that field test again we the new value 
        if (errorMessages[name]) {
            checkFieldForError(name, value);
        }
    }

    function errorCheck(e) {
        // :( hacky way try to find a better solution; 
        if (errorMessages[e.target.name] && errorMessages[e.target.name].includes('is already taken!')) return;

        if (e.target.name == INPUT_NAMES.REPASSWORD) {
            checkFieldForError(e.target.name, e.target.value, { passwordRef: values[INPUT_NAMES.PASSWORD] });
            return;
        }

        checkFieldForError(e.target.name, e.target.value);
    }

    return (
        <div className={styles['form-container']}>
            <form className={styles['register-form']} method='POST' onSubmit={onSubmit}>
                <h2>Create Account</h2>

                <p className={styles['error-field']}>{errorMessages[INPUT_NAMES.EMAIL]}</p>
                <input
                    type="email"
                    name={INPUT_NAMES.EMAIL}
                    placeholder='Email'
                    value={values[INPUT_NAMES.EMAIL]}
                    onChange={onInputChange}
                    onBlur={errorCheck}
                />

                <p className={styles['error-field']}>{errorMessages[INPUT_NAMES.USERNAME]}</p>
                <input
                    type="text"
                    name={INPUT_NAMES.USERNAME}
                    placeholder='Username'
                    value={values[INPUT_NAMES.USERNAME]}
                    onChange={onInputChange}
                    onBlur={errorCheck}
                />

                <p className={styles['error-field']}>{errorMessages[INPUT_NAMES.PASSWORD]}</p>
                <input
                    type="password"
                    name={INPUT_NAMES.PASSWORD}
                    placeholder='Password'
                    value={values[INPUT_NAMES.PASSWORD]}
                    onChange={onInputChange}
                    onBlur={errorCheck}
                />

                <p className={styles['error-field']}>{errorMessages[INPUT_NAMES.REPASSWORD]}</p>
                <input
                    type="password"
                    name={INPUT_NAMES.REPASSWORD}
                    placeholder='RePassword'
                    value={values[INPUT_NAMES.REPASSWORD]}
                    onChange={onInputChange}
                    onBlur={errorCheck}
                />

                <p className={styles['error-field']}></p>
                <SubmitBtn value={'Sign up'} active={submitButtonState} />

                <p className={styles['option']}>
                    You have an account? <Link to={PATH.LOGIN}>Login here!</Link>
                </p>
            </form>
        </div>
    );
};