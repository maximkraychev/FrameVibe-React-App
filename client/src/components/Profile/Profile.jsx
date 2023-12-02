import { Link, Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { DetailsContext } from '../../contexts/DetailsContext';
import { useModalUrlAndNavigation } from '../../hooks/useModalUrlAndNavigation';
import { getAllUserPosts } from '../../services/postService';
import { getUserInfo } from '../../services/userService';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { PARAMS, PATH } from '../../constants/paths';

import styles from './Profile.module.css';
import { PreviewPost } from './PreviewPost/PreviewPost';

export const Profile = () => {

    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const { auth, setUser } = useContext(AuthContext);
    const { handleUrlOnDetailsClose } = useModalUrlAndNavigation(PATH.PROFILE);
    const params = useParams();

    useEffect(() => {

        (async function loadUserAndPosts() {
            const username = params[PARAMS.USERNAME];
            let user = auth;

            if (username != auth.username) {
                user = await getUserInfo(username);
            }

            const arrivedPosts = await getAllUserPosts(user._id);

            setCurrentUserProfile({
                avatar: user.avatar,
                email: user.email,
                username: user.username,
                _id: user._id
            })
            setUserPosts(arrivedPosts);
            console.log(arrivedPosts);
        })();

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

                {userPosts.length !== 0
                    ? userPosts.map(post => {
                        return (<Link to={post._id} key={post._id}> <PreviewPost /> </Link>)
                    })
                    : <h2 className={styles['no-posts-text']}>There are no posts yet.</h2>
                }



                {/* <Link to={'asd23'}>
                    <PreviewPost />
                </Link>
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost /> */}
            </div>
        </section>
    );
};