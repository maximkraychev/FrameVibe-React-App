import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { PATH } from '../../constants/paths';

import styles from './Profile.module.css';
import { PreviewPost } from './PreviewPost/PreviewPost';

export const Profile = () => {

    const {auth, setUser} = useContext(AuthContext);
    const urlAfterDetailsClose = PATH.PROFILE;

    return (
        <section className={styles['profile-section']}>
            <Outlet context={[urlAfterDetailsClose]}></Outlet>
            <header>
                <div className={styles['profile-picture-container']}>
                    <img src={auth?.[INPUT_NAMES.USER_AVATAR]} alt="avatar" />
                </div>
                <div className={styles['profile-details']}>
                    <p>{auth?.username}</p>
                    <button className={styles['profile-edit-btn']}>Edit profile</button>
                </div>
            </header>

            <div className={styles['user-posts']}>
                <Link to={'asd23'}>
                    <PreviewPost />
                </Link>
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
            </div>
        </section>
    );
};