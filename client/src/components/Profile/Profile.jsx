import { Link, Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { DetailsContext } from '../../contexts/DetailsContext';
import { useModalUrlAndNavigation } from '../../hooks/useModalUrlAndNavigation';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { PARAMS, PATH } from '../../constants/paths';

import styles from './Profile.module.css';
import { PreviewPost } from './PreviewPost/PreviewPost';
import { getUserInfo } from '../../services/userService';

export const Profile = () => {

    const { auth, setUser } = useContext(AuthContext);
    const { handleUrlOnDetailsClose } = useModalUrlAndNavigation(PATH.PROFILE);
    const params = useParams();
    const username = params[PARAMS.USERNAME];

    useEffect(() => {

        if (username != auth.username) {
            getUserInfo(username)
                .then(response => console.log(response));
        }

    }, [params]);

    return (
        <section className={styles['profile-section']}>
            <DetailsContext.Provider value={handleUrlOnDetailsClose}>
                <Outlet></Outlet>
            </DetailsContext.Provider>
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