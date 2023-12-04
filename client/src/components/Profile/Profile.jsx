import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { StateContext } from '../../contexts/StateContext';
import { useDetailsModal } from '../../hooks/useDetailsModal';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';
import { getAllUserPosts } from '../../services/postService';
import { getUserInfoByUsername } from '../../services/userService';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { PARAMS, PATH } from '../../constants/paths';

import styles from './Profile.module.css';
import { PreviewPost } from './PreviewPost/PreviewPost';
import { PostWithModal } from '../Details/PostWithModal';

export const Profile = () => {

    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const { state, changePostsState } = useContext(StateContext);
    const { initHandlerDetailsModal } = useDetailsModal()
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
                changePostsState(arrivedPostWithPopulatedOwner);
            })();

        } catch (err) {
            console.log(err);
            //TODO .handle the error
        }

    }, [params]);

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

                {state[STATE_FIELDS.POSTS].length !== 0
                    ? state[STATE_FIELDS.POSTS].map(post => {
                        return (
                            <Link
                                key={post._id}
                                to={PATH.POST_FN(post._id)}
                                onClick={initHandlerDetailsModal.bind(null, post)}
                            >
                                <PreviewPost {...post} />
                            </Link>)
                    })
                    : <h2 className={styles['no-posts-text']}>There are no posts yet.</h2>
                }

            </div>

            {state[STATE_FIELDS.DETAILS_VISIBILITY] && <PostWithModal />}
        </section>
    );
};