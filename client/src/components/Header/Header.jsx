import styles from './Header.module.css';
import logoIcon from '../../assets/logo-vector.svg';
import menuIcon from '../../assets/menu-vector.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const [toggleState, setToggleState] = useState(false);


    return(
        <header className={styles['main-header']}>
            <div className={'section-container ' + styles['header-container']}>

                <div className={styles['icon-wrapper']}>
                    <h1 className={styles['logo']}>
                        <Link to="/">
                            <img src={logoIcon} alt="logo" />
                        </Link>
                    </h1>
                    <p className={styles['toggle-menu']} onClick={() => setToggleState(state => !state)}>
                        <img src={menuIcon} alt="menu-toggle" />
                    </p>
                </div>
                
                    <nav className={[styles['main-nav'], toggleState ? styles['active'] : ''].join(' ')}>

                    <p>
                        <Link to="/browse">Browse</Link>
                    </p>

                    {/* Guest */}
                    <p>
                        <Link to="/auth/login">Login</Link>
                    </p>
                    <p>
                        <Link to="/auth/register">Register</Link>
                    </p>

                    {/* User */}
                    <p>
                        <Link to="/upload">Upload Image</Link>
                    </p>
                    <p>
                        <Link to="/profile">Profile</Link>
                    </p>
                    
                    <p>
                        <Link to="/auth/logout">Logout</Link>
                    </p>

                    </nav>

            </div>
        </header>
    );
};

export default Header;