import { Link, Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { DetailsContext } from '../../contexts/DetailsContext';
import { useModalUrlAndNavigation } from '../../hooks/useModalUrlAndNavigation';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { PARAMS, PATH } from '../../constants/paths';

import styles from './Profile.module.css';
import { PreviewPost } from './PreviewPost/PreviewPost';
import { getUserInfo } from '../../services/userService';

export const Profile = () => {

    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const { auth, setUser } = useContext(AuthContext);
    const { handleUrlOnDetailsClose } = useModalUrlAndNavigation(PATH.PROFILE);
    const params = useParams();

    useEffect(() => {
        const username = params[PARAMS.USERNAME];

        if (username != auth.username) {
            getUserInfo(username)
                .then(response => {
                    setCurrentUserProfile({
                        avatar: response.avatar,
                        email: response.email,
                        username: response.username,
                        _id: response.id
                    })
                });
        } else {
            setCurrentUserProfile({
                avatar: auth.avatar,
                email: auth.email,
                username: auth.username,
                _id: auth.id
            })
        }

    }, [params]);

    return (
        <section className={styles['profile-section']}>
            <DetailsContext.Provider value={handleUrlOnDetailsClose}>
                <Outlet></Outlet>
            </DetailsContext.Provider>
            <header>
                <div className={styles['profile-picture-container']}>
                    <img src={currentUserProfile?.[INPUT_NAMES.USER_AVATAR]} alt="avatar" />
                </div>
                <div className={styles['profile-details']}>
                    <p>{currentUserProfile?.[INPUT_NAMES.USERNAME]}</p>
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