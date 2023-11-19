import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import { PATH } from '../../../constants/paths';
import { INPUT_NAMES } from '../../../constants/formInputNaming';
import { useForm } from '../../../hooks/useForm';
import { registerService } from '../../../services/authService';

export const Register = () => {

    const { values, changeHandler, onSubmit } = useForm({
        [INPUT_NAMES.EMAIL]: '',
        [INPUT_NAMES.USERNAME]: '',
        [INPUT_NAMES.PASSWORD]: '',
        [INPUT_NAMES.REPASSWORD]: ''
    },
        onRegisterSubmit)

    async function onRegisterSubmit(data) {
        const {repassword, ...userDataForServer} = data
        console.log(userDataForServer);
        const result = await registerService(userDataForServer);
        console.log(result);
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