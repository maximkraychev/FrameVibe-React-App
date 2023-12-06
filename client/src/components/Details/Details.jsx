import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { StateContext } from '../../contexts/StateContext';
import { useDetailsModal } from '../../hooks/useDetailsModal';
import { getSinglePost } from '../../services/postService';
import { PARAMS, PATH } from '../../constants/paths';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';

import styles from './Details.module.css';
import { Xmark } from '../Svg/Xmark';

export const Details = () => {

    const { state } = useContext(StateContext);
    const { closeHandlerDetailsModal, clearDetailsModalState } = useDetailsModal();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const params = useParams();

    useEffect(() => {

        if (!state[STATE_FIELDS.DETAIL_POST]) {

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
            setPost(state[STATE_FIELDS.DETAIL_POST])
            setUser(state[STATE_FIELDS.DETAIL_POST].owner)
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
                        <Link to={PATH.POST_EDIT_FN(post?._id)} onClick={clearDetailsModalState}>Edit</Link>
                        <Link>Delete</Link>
                        {state[STATE_FIELDS.DETAILS_VISIBILITY] && <p className={styles['x-container']} onClick={closeHandlerDetailsModal}><Xmark /> </p>}
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
                            <Link to={PATH.POST_EDIT_FN(post?._id)} onClick={clearDetailsModalState}>Edit</Link>
                            <Link>Delete</Link>

                            {state[STATE_FIELDS.DETAILS_VISIBILITY] && <p className={styles['x-container']} onClick={closeHandlerDetailsModal}><Xmark /> </p>}
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