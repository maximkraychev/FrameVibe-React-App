import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export const Login = () => {
    return (
        <div className={styles['form-container']}>
            <form className={styles['login-form']}>
                <h2>Sign in</h2>
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <input type="submit" value={'Sign in'} />
                <p className={styles['option']}>
                    You don&apos;t have an account? <Link to='/register'>Register here!</Link>
                </p>
            </form>
        </div>
    );
};