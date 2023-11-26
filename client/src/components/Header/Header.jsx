import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { PATH } from '../../constants/paths';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './Header.module.css';
import logoIcon from '../../assets/logo.svg';
import { ProfileSvg } from '../Svg/Profile';
import { LogoutSvg } from '../Svg/Logout';
import { UploadSvg } from '../Svg/Upload';
import { ExploreSvg } from '../Svg/Explore';

export const Header = () => {

    const {auth, setUser} = useContext(AuthContext);


    function setLinksAndActiveCss(boolean) {
        return  [
            styles['links'],
            boolean ? styles['active'] : ''
        ].join(' ');
    }


    return (
        <header className={styles['main-header']}>
            <div className={'section-container ' + styles['header-container']}>

                <h1 className={styles['logo']}>
                    <Link to="/">
                        <img src={logoIcon} alt="logo" />
                    </Link>
                </h1>

                <nav className={styles['desktop-nav']}>

                    <NavLink to={PATH.EXPLORE} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <ExploreSvg />
                        <p>Explore</p>
                    </NavLink>

                    {/* Guest */}
                    {/* <Link to="/auth/login" className={styles['links']}>Login</Link>
                    <Link to="/auth/register" className={styles['links']}>Register</Link> */}

                    {/* User */}
                    <NavLink to={PATH.UPLOAD} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <UploadSvg />
                        <p>Upload Image</p>
                    </NavLink>

                    <NavLink to={PATH.PROFILE} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <ProfileSvg />
                        <p>Profile</p>
                    </NavLink>


                    <Link to={PATH.LOGOUT} className={styles['links']}>
                        <LogoutSvg />
                        <p>Logout</p>
                    </Link>
                </nav>

                <nav className={styles['mobile-nav']}>
                    <NavLink to={PATH.EXPLORE} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <ExploreSvg />
                    </NavLink>

                    {/* User */}
                    <NavLink to={PATH.UPLOAD} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <UploadSvg />
                    </NavLink>

                    <NavLink to={PATH.PROFILE} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <ProfileSvg />
                    </NavLink>


                    <Link to={PATH.LOGOUT} className={styles['links']}>
                        <LogoutSvg />
                    </Link>
                </nav>

            </div>
        </header >
    );
};