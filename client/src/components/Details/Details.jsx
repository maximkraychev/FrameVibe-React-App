import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { StateContext } from '../../contexts/StateContext';
import { getSinglePost } from '../../services/postService';
import { getUserInfoByUsernameOrId } from '../../services/userService';
import { PARAMS } from '../../constants/paths';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';

import styles from './Details.module.css';
import { Xmark } from '../Svg/Xmark';

export const Details = (props) => {

    const { state } = useContext(StateContext);
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const params = useParams();

    useEffect(() => {

        try {
            (async function getData() {
                let currentPost = null;

                if (state[STATE_FIELDS.POSTS]?.length !== 0) {
                    currentPost = state[STATE_FIELDS.POSTS].find((post) => post._id == params[PARAMS.POSTID]);
                }

                if (!currentPost && params[PARAMS.POSTID]) {
                    currentPost = await getSinglePost(params[PARAMS.POSTID]);
                }

                setPost(currentPost);

                if (currentPost.owner instanceof String) {
                    const postOwner = await getUserInfoByUsernameOrId(currentPost.owner);
                    setUser(postOwner);
                } else if (currentPost.owner instanceof Object) {
                    setUser(currentPost.owner);
                }

            })();

        } catch (err) {
            console.log(err);
            //TODO handle the error
        }

    }, [])

    return (
        <>
            <div className={styles['details-container']}>
                <div className={styles['owner-mobile']}>
                    <div className={styles['avatar-container-mobile']}>
                        <img src={user?.avatar} alt="avatar" />
                    </div>
                    <p>{user?.username}</p>
                    {props.changeVisibility && <Xmark onClick={changeVisibility} />}
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
                        {props.changeVisibility && <Xmark onClick={changeVisibility} />}
                    </div>
                    <div className={styles['description']}>
                        <p>
                            {post?.description}
                        </p>
                    </div>

                    {/* TODO..comments <div className={styles['comments']}></div> */}

                </div>
            </div>
        </>
    );
};