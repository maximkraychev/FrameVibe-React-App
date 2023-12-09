import { Link, Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';
import { StateContext } from '../../../contexts/StateContext';
import { STATE_FIELDS } from '../../../constants/stateFieldsConstants';
import { getAllUserPosts } from '../../../services/postService';
import { getUserInfoByUsername } from '../../../services/userService';
import { INPUT_NAMES } from '../../../constants/formInputNaming';
import { PARAMS, PATH } from '../../../constants/paths';

import styles from './Profile.module.css';
import { PreviewPost } from '../PreviewPost/PreviewPost';
import { PageTitle } from '../../PageTitle/PageTitle';
import { SITE_TITLE } from '../../../constants/titles';
import { MiddleSpinner } from '../../Spinner/MiddleSpinner/MiddleSpinner';

export const Profile = () => {

    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const { state, changePostsStateProfile } = useContext(StateContext);
    const { auth } = useContext(AuthContext);
    const params = useParams();
    const [spinnerState, setSpinnerState] = useState(true);

    useEffect(() => {

        setSpinnerState(true);

        (async function loadUserAndPosts() {
            try {
                // Take the username from url
                const username = params[PARAMS.USERNAME];

                if (!username) {
                    throw new Error('We couldn\'t find a username')
                }

                let user = null;

                // If username is the same with our auth user take the data from the state else fetch the user data
                if (username === auth.username) {
                    user = auth;
                } else {
                    user = await getUserInfoByUsername(username);
                }

                // Throw error if there are no user
                if (!user) {
                    throw new Error('We couldn\'t find such user');
                }

                // Take all user posts
                const arrivedPosts = await getAllUserPosts(user._id);


                // Set current user
                setCurrentUserProfile({
                    avatar: user.avatar,
                    email: user.email,
                    username: user.username,
                    _id: user._id
                })

                // Set posts
                changePostsStateProfile(arrivedPosts);
                setSpinnerState(false)
            } catch (err) {
                console.log(err);
                setSpinnerState(false);
                //TODO .handle the error
            }
        })();


    }, [params[PARAMS.USERNAME]]);

    return (
        <PageTitle title={SITE_TITLE.PROFILE_FN(currentUserProfile.username)}>

            {spinnerState

                ? <MiddleSpinner />

                : <section className={styles['profile-section']}>

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
                                        to={PATH.PROFILE_OPEN_POST_FN(post.owner.username, post._id)}
                                        state={post}
                                    >
                                        <PreviewPost {...post} />
                                    </Link>)
                            })
                            : <h2 className={styles['no-posts-text']}>There are no posts yet.</h2>
                        }

                    </div>

                    <Outlet></Outlet>
                </section>
            }

        </PageTitle>
    );
};