import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { useForm } from '../../../hooks/useForm';
import { submitBtnStateCheck } from '../../../util/submitBtnStateCheck';
import { LOGIN_FORM_VALIDATIONS } from '../../../util/formValidations';
import { INPUT_NAMES } from '../../../constants/formInputNaming';
import { PATH } from '../../../constants/paths';

import styles from './Login.module.css';
import { SubmitBtn } from '../../Buttons/SubmitBtn/SubmitBtn';

const initialValues = {
    [INPUT_NAMES.EMAIL]: '',
    [INPUT_NAMES.PASSWORD]: '',
};

export const Login = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState('');
    const { values, changeHandler, onSubmit } = useForm(initialValues, onLoginSubmit);
    const { errorMessages, errorVisibility, checkFieldForError, changeErrorVisibility } = useFormValidation(initialValues, LOGIN_FORM_VALIDATIONS);
    const [submitButtonState, setSubmitButtonState] = useState(submitBtnStateCheck(values, errorMessages));

    // Submit Btn state
    useEffect(() => {
        setSubmitButtonState(submitBtnStateCheck(values, errorMessages));
    }, [values, errorMessages]);

    async function onLoginSubmit(data) {
        try {
            await login(data);
            navigate(PATH.EXPLORE);
        } catch (err) {
            setSubmitError(err.message);
        }
    }

    function onInputChange(e) {
        changeHandler(e);
        checkFieldForError(e.target.name, e.target.value);
    }

    function showError(e) {
        changeErrorVisibility(e.target.name);
    }

    return (
        <div className={styles['form-container']} onSubmit={onSubmit}>
            <form className={styles['login-form']}>
                <h2>Sign in</h2>

                <p className={styles['error-field']}>{errorVisibility[INPUT_NAMES.EMAIL] && errorMessages[INPUT_NAMES.EMAIL]}</p>
                <input
                    type="email"
                    placeholder='Email'
                    name={INPUT_NAMES.EMAIL}
                    value={values[INPUT_NAMES.EMAIL]}
                    onChange={onInputChange}
                    onBlur={showError}
                />

                <p className={styles['error-field']}>{errorVisibility[INPUT_NAMES.PASSWORD] && errorMessages[INPUT_NAMES.PASSWORD]}</p>
                <input
                    type="password"
                    placeholder='Password'
                    name={INPUT_NAMES.PASSWORD}
                    value={values[INPUT_NAMES.PASSWORD]}
                    onChange={onInputChange}
                    onBlur={showError}
                />

                <p className={[styles['error-field'], styles['api-error']].join(' ')}>{submitError}</p>
                <SubmitBtn value={'Sign in'} active={submitButtonState} />

                <p className={styles['option']}>
                    You don&apos;t have an account? <Link to={PATH.REGISTER}>Register here!</Link>
                </p>
            </form>
        </div>
    );
};