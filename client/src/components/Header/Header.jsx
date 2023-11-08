import styles from './Header.module.css';
import logoIcon from '../../assets/logo.svg';
// import exploreIcon from '../../assets/explore.svg';
// import uploadIcon from '../../assets/upload.svg';
// import profileIcon from '../../assets/profile.svg';
// import logoutIcon from '../../assets/logout.svg';
import { Link } from 'react-router-dom';
import { ProfileSvg } from '../Svg/Profile';
import { LogoutSvg } from '../Svg/Logout';
import { UploadSvg } from '../Svg/Upload';
import { ExploreSvg } from '../Svg/Explore';

export const Header = () => {


    return (
        <header className={styles['main-header']}>
            <div className={'section-container ' + styles['header-container']}>

                <h1 className={styles['logo']}>
                    <Link to="/">
                        <img src={logoIcon} alt="logo" />
                    </Link>
                </h1>

                <nav className={styles['desktop-nav']}>

                    <Link to="/explore" className={styles['links']}>
                        <ExploreSvg />
                        <p>Explore</p>
                    </Link>

                    {/* Guest */}
                    {/* <Link to="/auth/login" className={styles['links']}>Login</Link>
                    <Link to="/auth/register" className={styles['links']}>Register</Link> */}

                    {/* User */}
                    <Link to="/upload" className={styles['links']}>
                        <UploadSvg />
                        <p>Upload Image</p>
                    </Link>

                    <Link to="/profile" className={styles['links']}>
                        <ProfileSvg />
                        <p>Profile</p>
                    </Link>


                    <Link to="/auth/logout" className={styles['links']}>
                        <LogoutSvg />
                        <p>Logout</p>
                    </Link>
                </nav>

                <nav className={styles['mobile-nav']}>
                    <Link to="/explore" className={styles['links']}>
                        <ExploreSvg />
                    </Link>

                    {/* User */}
                    <Link to="/upload" className={styles['links']}>
                        <UploadSvg />
                    </Link>

                    <Link to="/profile" className={styles['links']}>
                        <ProfileSvg />
                    </Link>


                    <Link to="/auth/logout" className={styles['links']}>
                        <LogoutSvg />
                    </Link>
                </nav>

            </div>
        </header >
    );
};