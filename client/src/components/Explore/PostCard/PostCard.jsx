import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import { StateContext } from '../../../contexts/StateContext';
import { dislikePost, likePost } from '../../../services/postService';
import { useSyncStateWithNewPost } from '../../../hooks/useSyncStateWithNewPost';

import styles from './PostCard.module.css';
import { HeartSvg } from '../../Svg/Heart';
import { HeartSolidSvg } from '../../Svg/HeartSolid';

export const PostCard = ({ post }) => {

    const { auth } = useContext(AuthContext);
    const { changeErrorModalMsgState } = useContext(StateContext);
    const [isLiked, setIsLiked] = useState(() => post.likes.includes(auth._id));
    const { syncState } = useSyncStateWithNewPost();

    const { owner, imageURL, description, likes, _id } = post;


    async function onLike() {

        try {
            // If owner return
            if ((auth && auth._id === post?.owner?._id)) return;

            const updatedPost = await likePost(_id);

            setIsLiked(true);
            syncState(updatedPost);
        } catch (err) {
            console.error(err);
            changeErrorModalMsgState(err.message);
        }

    }

    async function onDisLike() {
        try {
            // If owner return
            if ((auth && auth._id === post?.owner?._id)) return;

            const updatedPost = await dislikePost(_id);

            setIsLiked(false);
            syncState(updatedPost);
        } catch (err) {
            console.error(err);
            changeErrorModalMsgState(err.message);
        }
    }


    return (
        <>
            <div className={styles['card']}>
                <header>
                    <div className={styles['avatar-container']}>
                        <p>
                            <img src={owner?.avatar} alt="avatar" />
                        </p>
                    </div>
                    <p className={styles['username']}>{owner.username}</p>
                    <Link to={`/profile/${owner.username}`}>View Profile</Link>
                </header>
                <div className={styles['image-container']}>
                    <Link to={`/explore/${_id}`} state={post} >
                        <img src={imageURL} alt="main-image" />
                    </Link>
                </div>
                <div className={styles['actions']}>

                    {isLiked
                        ? <span
                            className={styles['svg-container']}
                            onClick={onDisLike}>
                            <HeartSolidSvg />
                        </span>
                        : <span
                            className={styles['svg-container']}
                            onClick={onLike}>
                            <HeartSvg />
                        </span>
                    }

                    <p>{likes?.length} likes</p>

                </div>
                <p className={styles['description']}>
                    {description}
                </p>
            </div>
        </>
    );
};