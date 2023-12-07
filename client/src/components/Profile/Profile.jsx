import { Link, Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { StateContext } from '../../contexts/StateContext';
import { usePostModal } from '../../hooks/usePostModal';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';
import { getAllUserPosts } from '../../services/postService';
import { getUserInfoByUsername } from '../../services/userService';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { PARAMS, PATH } from '../../constants/paths';

import styles from './Profile.module.css';
import { PreviewPost } from './PreviewPost/PreviewPost';

export const Profile = () => {

    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const { state, changePostsStateProfile } = useContext(StateContext);
    const { loadPostForModal } = usePostModal()
    const { auth } = useContext(AuthContext);
    const params = useParams();

    useEffect(() => {

        try {
            (async function loadUserAndPosts() {
                // Take the username from url
                const username = params[PARAMS.USERNAME];
                let user = null;

                // If username is the same with our auth user take the data from the state else fetch the user data
                if (username != auth.username && username) {
                    user = await getUserInfoByUsername(username);
                } else {
                    user = auth;
                }

                // Take all user posts and populate their owner
                const arrivedPosts = await getAllUserPosts(user._id);
                const arrivedPostWithPopulatedOwner = arrivedPosts.map(post => ({ ...post, owner: user }));

                // Set current user
                setCurrentUserProfile({
                    avatar: user.avatar,
                    email: user.email,
                    username: user.username,
                    _id: user._id
                })

                // Set posts
                changePostsStateProfile(arrivedPostWithPopulatedOwner);
            })();

        } catch (err) {
            console.log(err);
            //TODO .handle the error
        }

    }, [params[PARAMS.USERNAME]]);

    return (
        <section className={styles['profile-section']}>

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

                {state[STATE_FIELDS.POSTS_PROFILE].length !== 0
                    ? state[STATE_FIELDS.POSTS_PROFILE].map(post => {
                        return (
                            <Link
                                key={post._id}
                                to={PATH.PROFILE_OPEN_POST_FN(post.owner.username ,post._id)}
                                onClick={loadPostForModal.bind(null, post)}
                            >
                                <PreviewPost {...post} />
                            </Link>)
                    })
                    : <h2 className={styles['no-posts-text']}>There are no posts yet.</h2>
                }

            </div>

            <Outlet></Outlet>
        </section>
    );
};