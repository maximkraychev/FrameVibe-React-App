import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import { PATH } from '../../../paths/paths';

export const Register = () => {
    return (
        <div className={styles['form-container']}>
            <form className={styles['login-form']}>
                <h2>Create Account</h2>
                <input type="email" placeholder='Email' />
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <input type="submit" value={'Sign up'} />
                <p className={styles['option']}>
                    You have an account? <Link to={PATH.LOGIN}>Login here!</Link>
                </p>
            </form>
        </div>
    );
};