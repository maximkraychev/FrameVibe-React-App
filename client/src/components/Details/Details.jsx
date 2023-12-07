import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { StateContext } from '../../contexts/StateContext';
import { AuthContext } from '../../contexts/AuthContext';
import { usePostModal } from '../../hooks/usePostModal';
import { getSinglePost } from '../../services/postService';
import { PARAMS, PATH } from '../../constants/paths';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';

import styles from './Details.module.css';
import { Xmark } from '../Svg/Xmark';

export const Details = () => {

    const { state } = useContext(StateContext);
    const { closePostModal, clearLoadedPostForModal } = usePostModal();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const params = useParams();
    const { auth } = useContext(AuthContext)

    useEffect(() => {

        if (!state[STATE_FIELDS.POST_MODAL]) {

            try {
                (async function getData() {
                    if (params[PARAMS.POSTID]) {
                        const currentPost = await getSinglePost(params[PARAMS.POSTID]);
                        setPost(currentPost);
                        setUser(currentPost.owner);
                    }

                })();

            } catch (err) {
                console.log(err);
                //TODO handle the error
            }

        } else {
            setPost(state[STATE_FIELDS.POST_MODAL])
            setUser(state[STATE_FIELDS.POST_MODAL].owner)
        }

        return () => {
            console.log('----------');
            clearLoadedPostForModal()
        }

    }, [])

    return (
        <>
            {post &&
                <div className={styles['details-container']}>
                    <div className={styles['owner-mobile']}>
                        <div className={styles['avatar-container-mobile']}>
                            <img src={user?.avatar} alt="avatar" />
                        </div>
                        <p>{user?.username}</p>
                        <Link to={PATH.POST_EDIT_FN(post?._id)} onClick={clearLoadedPostForModal}>Edit</Link>
                        <Link>Delete</Link>
                        {state[STATE_FIELDS.POST_MODAL] && <p className={styles['x-container']} onClick={closePostModal}><Xmark /> </p>}
                    </div>


                    <div className={styles['image-container']}>
                        <img src={post?.imageURL} alt="main-image" />
                    </div>

                    <div className={styles['description-container']}>
                        <div className={styles['owner-desktop']}>
                            <div className={styles['avatar-container-desktop']}>
                                <img src={user?.avatar} alt="avatar" />
                            </div>
                            <p>{user?.username}</p>
                            <Link to={PATH.POST_EDIT_FN(post?._id)} onClick={clearLoadedPostForModal}>Edit</Link>
                            <Link>Delete</Link>

                            {state[STATE_FIELDS.POST_MODAL] && <p className={styles['x-container']} onClick={closePostModal}><Xmark /> </p>}
                        </div>
                        <div className={styles['description']}>
                            <p>
                                {post?.description}
                            </p>
                        </div>

                        {/* TODO..comments <div className={styles['comments']}></div> */}

                    </div>
                </div>
            }

            {!post &&
                <h4 className={styles['not-found-post']}>We couldn't locate the post you're looking for. It may have been deleted or doesn't exist.</h4>
            }
        </>
    );
};