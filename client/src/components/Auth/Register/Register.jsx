import { Link } from 'react-router-dom';
import styles from './Register.module.css';

export const Register = () => {
    return (
        <div className={'section-container ' + styles['login']}>
            <form className={styles['login-form']}>
                <h2>Create Account</h2>
                <input type="email" placeholder='Email' />
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <input type="submit" value={'Sign up'} />
                <p className={styles['option']}>
                    You have an account? <Link to='/login'>Login here!</Link>
                </p>
            </form>
        </div>
    );
};