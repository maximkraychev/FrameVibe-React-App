import { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { PATH } from '../../constants/paths';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './Header.module.css';
import logoIcon from '../../assets/logo.svg';
import { ProfileSvg } from '../Svg/Profile';
import { LoginLogoutSvg } from '../Svg/LoginLogout';
import { UploadSvg } from '../Svg/Upload';
import { ExploreSvg } from '../Svg/Explore';
import { RegisterSvg } from '../Svg/Register';

export const Header = () => {

    const { auth, setUser } = useContext(AuthContext);

    function setLinksAndActiveCss(boolean) {
        return [
            styles['links'],
            boolean ? styles['active'] : ''
        ].join(' ');
    }


    return (
        <header className={styles['main-header']}>
            <div className={'section-container ' + styles['header-container']}>

                <h1 className={styles['logo']}>
                    <Link to={PATH.EXPLORE}>
                        <img src={logoIcon} alt="logo" />
                    </Link>
                </h1>

                {/* Desktop view */}
                <nav className={styles['desktop-nav']}>

                    {/* Guest */}
                    {!auth &&
                        <>
                            <NavLink to={PATH.LOGIN} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <LoginLogoutSvg />
                                <p>Login</p>
                            </NavLink>
                            <NavLink to={PATH.REGISTER} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <RegisterSvg />
                                <p>Register</p>
                            </NavLink>
                        </>
                    }

                    {/* User */}
                    {auth &&
                        <>
                            <NavLink to={PATH.EXPLORE} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <ExploreSvg />
                                <p>Explore</p>
                            </NavLink>

                            <NavLink to={PATH.UPLOAD} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <UploadSvg />
                                <p>Upload Image</p>
                            </NavLink>

                            <NavLink to={PATH.PROFILE_FN(auth.username)} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <ProfileSvg />
                                <p>Profile</p>
                            </NavLink>


                            <Link to={PATH.LOGOUT} className={styles['links']}>
                                <LoginLogoutSvg />
                                <p>Logout</p>
                            </Link>
                        </>
                    }
                </nav>

                {/* Mobile view */}
                <nav className={styles['mobile-nav']}>

                    {/* Guest */}
                    {!auth &&
                        <>
                            <NavLink to={PATH.LOGIN} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <LoginLogoutSvg />
                            </NavLink>
                            <NavLink to={PATH.REGISTER} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <RegisterSvg />
                            </NavLink>
                        </>
                    }

                    {/* User */}
                    {auth &&
                        <>
                            <NavLink to={PATH.EXPLORE} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <ExploreSvg />
                            </NavLink>

                            <NavLink to={PATH.UPLOAD} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <UploadSvg />
                            </NavLink>

                            <NavLink to={PATH.PROFILE_FN(auth.username)} className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                                <ProfileSvg />
                            </NavLink>


                            <Link to={PATH.LOGOUT} className={styles['links']}>
                                <LoginLogoutSvg />
                            </Link>
                        </>
                    }
                </nav>

            </div>
        </header >
    );
};