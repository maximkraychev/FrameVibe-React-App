import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { PATH } from '../../../constants/paths';
import { useForm } from '../../../hooks/useForm';
import { INPUT_NAMES } from '../../../constants/formInputNaming';
import { loginService } from '../../../services/authService';


export const Login = () => {

    const navigate = useNavigate();
    const { values, changeHandler, onSubmit } = useForm({
        [INPUT_NAMES.EMAIL]: '',
        [INPUT_NAMES.PASSWORD]: '',
    },
        onLoginSubmit)

    async function onLoginSubmit(data) {
        await loginService(data);
        navigate(PATH.EXPLORE);
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
                    onChange={changeHandler} 
                />

                <input 
                    type="password" 
                    placeholder='Password'
                    name={INPUT_NAMES.PASSWORD}
                    value={values[INPUT_NAMES.PASSWORD]}
                    onChange={changeHandler}  
                />

                <input type="submit" value={'Sign in'} />
                <p className={styles['option']}>
                    You don&apos;t have an account? <Link to={PATH.REGISTER}>Register here!</Link>
                </p>
            </form>
        </div>
    );
};