import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { useForm } from '../../../hooks/useForm';
import { submitBtnStateCheck } from '../../../util/submitBtnStateCheck';
import { LOGIN_FORM_VALIDATIONS } from '../../../util/formValidations';
import { INPUT_NAMES } from '../../../constants/formInputNaming';
import { PATH } from '../../../constants/paths';

import styles from './Login.module.css';
import { SubmitBtn } from '../../SubmitBtn/SubmitBtn';

const initialValues = {
    [INPUT_NAMES.EMAIL]: '',
    [INPUT_NAMES.PASSWORD]: '',
}

export const Login = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const { values, changeHandler, onSubmit } = useForm(initialValues, onLoginSubmit);
    const { errorMessages, checkFieldForError } = useFormValidation(initialValues, LOGIN_FORM_VALIDATIONS);
    const [submitButtonState, setSubmitButtonState] = useState(submitBtnStateCheck(values, errorMessages));

    let timeout = [];

    async function onLoginSubmit(data) {
        await login(data);
        navigate(PATH.EXPLORE);
        //TODO handle error 
    }

    function onInputChange(e) {
        changeHandler(e);


        // Set up timeout so the function below does not trigger unless the user have stop typing for 0.5sec
        // console.log(timeout);
        // if (timeout.length > 0) {
        //     timeout.forEach(x => clearTimeout(x));
        // }

        // timeout = setTimeout(() => {
            if (errorMessages[e.target.name]) {
                errorCheck(e);
            }

            
        // }, 500)

    }

    function errorCheck(e) {
        // TODO find a way to use values from useForm (If i try here there is delay until the values are changed)
        checkFieldForError(e.target.name, e.target.value);
        setSubmitButtonState(submitBtnStateCheck(values, errorMessages));
    }

    return (
        <div className={styles['form-container']} onSubmit={onSubmit}>
            <form className={styles['login-form']}>
                <h2>Sign in</h2>

                <input
                    type="email"
                    placeholder='Email'
                    name={INPUT_NAMES.EMAIL}
                    value={values[INPUT_NAMES.EMAIL]}
                    onChange={onInputChange}
                    onBlur={errorCheck}
                />

                <input
                    type="password"
                    placeholder='Password'
                    name={INPUT_NAMES.PASSWORD}
                    value={values[INPUT_NAMES.PASSWORD]}
                    onChange={onInputChange}
                    onBlur={errorCheck}
                />

                {errorMessages[INPUT_NAMES.EMAIL] && <h2>Error email</h2>}
                {errorMessages[INPUT_NAMES.PASSWORD] && <h2>Error password</h2>}

                {/* <input type="submit" value={'Sign in'} /> */}
                <SubmitBtn value={'Sign in'} active={submitButtonState} />
                <p className={styles['option']}>
                    You don&apos;t have an account? <Link to={PATH.REGISTER}>Register here!</Link>
                </p>
            </form>
        </div>
    );
};