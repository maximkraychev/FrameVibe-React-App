import styles from './Header.module.css';
import logoIcon from '../../assets/logo.svg';
import menuIcon from '../../assets/menu.svg';
import exploreIcon from '../../assets/explore.svg';
import uploadIcon from '../../assets/upload.svg';
import profileIcon from '../../assets/profile.svg';
import logoutIcon from '../../assets/logout.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {

    const [toggleState, setToggleState] = useState(false);


    return (
        <header className={styles['main-header']}>
            <div className={'section-container ' + styles['header-container']}>

                <div className={styles['logo-wrapper']}>
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

                    <Link to="/explore" className={styles['links']}>
                        <img src={exploreIcon} alt="explore-icon" />
                        <p>Explore</p>
                    </Link>

                    {/* Guest */}
                    {/* <Link to="/auth/login" className={styles['links']}>Login</Link>
                    <Link to="/auth/register" className={styles['links']}>Register</Link> */}

                    {/* User */}
                    <Link to="/upload" className={styles['links']}>
                        <img src={uploadIcon} alt="upload-icon" />
                        <p>Upload Image</p>
                    </Link>

                    <Link to="/profile" className={styles['links']}>
                        <img src={profileIcon} alt="profile-icon" />
                        <p>Profile</p>
                    </Link>


                    <Link to="/auth/logout" className={styles['links']}>
                        <img src={logoutIcon} alt="logout-icon" />
                        <p>Logout</p>
                    </Link>


                </nav>

            </div>
        </header>
    );
};