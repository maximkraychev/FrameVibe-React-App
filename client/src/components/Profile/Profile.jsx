import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { StateContext } from '../../contexts/StateContext';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';
import { getAllUserPosts } from '../../services/postService';
import { getUserInfoByUsernameOrId } from '../../services/userService';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { PARAMS, PATH } from '../../constants/paths';

import styles from './Profile.module.css';
import { PreviewPost } from './PreviewPost/PreviewPost';

export const Profile = () => {

    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const { state, changePostState, changeBackgroundComponent } = useContext(StateContext);
    const { auth, setUser } = useContext(AuthContext);
    const params = useParams();

    useEffect(() => {

        try {
            (async function loadUserAndPosts() {
                const username = params[PARAMS.USERNAME];
                let user = auth;

                if (username != auth.username && username) {
                    user = await getUserInfoByUsernameOrId(username);
                }

                const arrivedPosts = await getAllUserPosts(user._id);

                setCurrentUserProfile({
                    avatar: user.avatar,
                    email: user.email,
                    username: user.username,
                    _id: user._id
                })

                changePostState(arrivedPosts);
            })();

            return () => changeBackgroundComponent(Profile);

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
                                // state={{ post: post, user: currentUserProfile, background: COMPONENT_NAMES.PROFILE }}
                                >
                                <PreviewPost {...post} />
                            </Link>)
                    })
                    : <h2 className={styles['no-posts-text']}>There are no posts yet.</h2>
                }

            </div>
        </section>
    );
};