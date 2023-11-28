import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { PATH } from '../../../constants/paths';
import { INPUT_NAMES } from '../../../constants/formInputNaming';
import { useForm } from '../../../hooks/useForm';
import { AuthContext } from '../../../contexts/AuthContext';

import styles from './Register.module.css';

export const Register = () => {

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const { values, changeHandler, onSubmit } = useForm({
        [INPUT_NAMES.EMAIL]: '',
        [INPUT_NAMES.USERNAME]: '',
        [INPUT_NAMES.PASSWORD]: '',
        [INPUT_NAMES.REPASSWORD]: '',
        [INPUT_NAMES.USER_AVATAR]: INPUT_NAMES.USER_BASE_AVATAR_URL
    },
        onRegisterSubmit)

    async function onRegisterSubmit(data) {
        const { repassword, ...userDataForServer } = data;
        await register(userDataForServer)
        navigate(PATH.EXPLORE);
        //TODO handle error
    }

    return (
        <div className={styles['form-container']}>
            <form className={styles['login-form']} method='POST' onSubmit={onSubmit}>
                <h2>Create Account</h2>

                <input
                    type="email"
                    name={INPUT_NAMES.EMAIL}
                    placeholder='Email'
                    value={values[INPUT_NAMES.EMAIL]}
                    onChange={changeHandler}
                />

                <input
                    type="text"
                    name={INPUT_NAMES.USERNAME}
                    placeholder='Username'
                    value={values[INPUT_NAMES.USERNAME]}
                    onChange={changeHandler}
                />

                <input
                    type="password"
                    name={INPUT_NAMES.PASSWORD}
                    placeholder='Password'
                    value={values[INPUT_NAMES.PASSWORD]}
                    onChange={changeHandler}
                />

                <input
                    type="password"
                    name={INPUT_NAMES.REPASSWORD}
                    placeholder='Password'
                    value={values[INPUT_NAMES.REPASSWORD]}
                    onChange={changeHandler}
                />

                <input type="submit" value={'Sign up'} />
                <p className={styles['option']}>
                    You have an account? <Link to={PATH.LOGIN}>Login here!</Link>
                </p>
            </form>
        </div>
    );
};