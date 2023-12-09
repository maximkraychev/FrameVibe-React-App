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
import { SITE_TITLE } from '../../../constants/titles';

import styles from './Register.module.css';
import { SubmitBtn } from '../../Buttons/SubmitBtn/SubmitBtn';
import { PageTitle } from '../../PageTitle/PageTitle';


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
    const [submitError, setSubmitError] = useState('');
    const { values, changeHandler, onSubmit } = useForm(initialValues, onRegisterSubmit);
    const { errorMessages, errorVisibility, checkFieldForError, changeErrorVisibility } = useFormValidation(initialValues, REGISTER_FORM_VALIDATIONS);
    const [submitButtonState, setSubmitButtonState] = useState(submitBtnStateCheck(values, errorMessages));
    const [btnLoadingState, setBtnLoadingState] = useState(false);

    // Submit Btn state;
    useEffect(() => {
        setSubmitButtonState(submitBtnStateCheck(values, errorMessages));
    }, [values, errorMessages]);

    // Timeouts 
    const timeouts = useRef({
        [INPUT_NAMES.EMAIL]: null,
        [INPUT_NAMES.USERNAME]: null
    });


    async function onRegisterSubmit(data) {
        try {
            setBtnLoadingState(true);
            const { repassword, ...userDataForServer } = data;
            await register(userDataForServer);
            navigate(PATH.EXPLORE);
        } catch (err) {
            setBtnLoadingState(false);
            setSubmitError(err.message);
        }
    }

    function onInputChange(e) {
        changeHandler(e);
        const value = e.target.value;
        const name = e.target.name;

        switch (name) {
            case INPUT_NAMES.EMAIL:
                // In case of Email we need to make async request
                if (timeouts[INPUT_NAMES.EMAIL]) clearTimeout(timeouts[INPUT_NAMES.EMAIL]);
                timeouts[INPUT_NAMES.EMAIL] = checkFieldForError(name, value, { async: getUserInfoByEmail, error: 'This email is already taken!' });
                break;

            case INPUT_NAMES.USERNAME:
                // In case of Username we need to make async request
                if (timeouts[INPUT_NAMES.USERNAME]) clearTimeout(timeouts[INPUT_NAMES.USERNAME]);
                timeouts[INPUT_NAMES.USERNAME] = checkFieldForError(name, value, { async: getUserInfoByUsername, error: 'This username is already taken!' });
                break;

            case INPUT_NAMES.REPASSWORD:
                // In case of rePassword we need to give also the current password
                checkFieldForError(name, value, { passwordRef: values[INPUT_NAMES.PASSWORD] });
                return;

            case INPUT_NAMES.PASSWORD:
                // This is for the case where we started with repass and then add value to pass. This way as long as the are identical there wont be an error
                checkFieldForError(name, value);
                checkFieldForError(INPUT_NAMES.REPASSWORD, values[INPUT_NAMES.REPASSWORD], { passwordRef: value });
                return;
        }

        checkFieldForError(name, value);
    }

    function showError(e) {
        changeErrorVisibility(e.target.name, e.target.value);
    }

    return (
        <PageTitle title={SITE_TITLE.REGISTER}>
            <div className={styles['form-container']}>
                <form className={styles['register-form']} method='POST' onSubmit={onSubmit}>
                    <h2>Create Account</h2>

                    <p className={styles['error-field']}>{errorVisibility[INPUT_NAMES.EMAIL] && errorMessages[INPUT_NAMES.EMAIL]}</p>
                    <input
                        type="email"
                        name={INPUT_NAMES.EMAIL}
                        placeholder='Email'
                        value={values[INPUT_NAMES.EMAIL]}
                        onChange={onInputChange}
                        onBlur={showError}
                    />

                    <p className={styles['error-field']}>{errorVisibility[INPUT_NAMES.USERNAME] && errorMessages[INPUT_NAMES.USERNAME]}</p>
                    <input
                        type="text"
                        name={INPUT_NAMES.USERNAME}
                        placeholder='Username'
                        value={values[INPUT_NAMES.USERNAME]}
                        onChange={onInputChange}
                        onBlur={showError}
                    />

                    <p className={styles['error-field']}>{errorVisibility[INPUT_NAMES.PASSWORD] && errorMessages[INPUT_NAMES.PASSWORD]}</p>
                    <input
                        type="password"
                        name={INPUT_NAMES.PASSWORD}
                        placeholder='Password'
                        value={values[INPUT_NAMES.PASSWORD]}
                        onChange={onInputChange}
                        onBlur={showError}
                    />

                    <p className={styles['error-field']}>{errorVisibility[INPUT_NAMES.REPASSWORD] && errorMessages[INPUT_NAMES.REPASSWORD]}</p>
                    <input
                        type="password"
                        name={INPUT_NAMES.REPASSWORD}
                        placeholder='RePassword'
                        value={values[INPUT_NAMES.REPASSWORD]}
                        onChange={onInputChange}
                        onBlur={showError}
                    />

                    <p className={[styles['error-field'], styles['api-error']].join(' ')}>{submitError}</p>
                    <div className={styles['submit-btn-container']}>
                        <SubmitBtn value={'Sign up'} active={submitButtonState} loading={btnLoadingState} />
                    </div>

                    <p className={styles['option']}>
                        You have an account? <Link to={PATH.LOGIN}>Login here!</Link>
                    </p>
                </form>
            </div>
        </PageTitle>
    );
};