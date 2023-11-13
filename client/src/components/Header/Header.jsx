import styles from './Header.module.css';
import logoIcon from '../../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { ProfileSvg } from '../Svg/Profile';
import { LogoutSvg } from '../Svg/Logout';
import { UploadSvg } from '../Svg/Upload';
import { ExploreSvg } from '../Svg/Explore';

export const Header = () => {

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

                    <NavLink to="/explore" className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <ExploreSvg />
                        <p>Explore</p>
                    </NavLink>

                    {/* Guest */}
                    {/* <Link to="/auth/login" className={styles['links']}>Login</Link>
                    <Link to="/auth/register" className={styles['links']}>Register</Link> */}

                    {/* User */}
                    <NavLink to="/upload" className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <UploadSvg />
                        <p>Upload Image</p>
                    </NavLink>

                    <NavLink to="/profile" className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <ProfileSvg />
                        <p>Profile</p>
                    </NavLink>


                    <Link to="/auth/logout" className={styles['links']}>
                        <LogoutSvg />
                        <p>Logout</p>
                    </Link>
                </nav>

                <nav className={styles['mobile-nav']}>
                    <NavLink to="/explore" className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <ExploreSvg />
                    </NavLink>

                    {/* User */}
                    <NavLink to="/upload" className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <UploadSvg />
                    </NavLink>

                    <NavLink to="/profile" className={({ isActive }) => setLinksAndActiveCss(isActive)}>
                        <ProfileSvg />
                    </NavLink>


                    <Link to="/auth/logout" className={styles['links']}>
                        <LogoutSvg />
                    </Link>
                </nav>

            </div>
        </header >
    );
};