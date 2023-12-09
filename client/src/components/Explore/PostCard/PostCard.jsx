import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import { StateContext } from '../../../contexts/StateContext';
import { dislikePost, likePost } from '../../../services/postService';
import { useSyncStateWithNewPost } from '../../../hooks/useSyncStateWithNewPost';

import styles from './PostCard.module.css';
import { HeartSolidSvg } from '../../Svg/HeartSolid';
import { Heart } from '../../Buttons/Heart/Heart';
import { ButtonSpinner } from '../../Spinner/ButtonSpinner/ButtonSpinner';

export const PostCard = ({ post }) => {

    const { auth } = useContext(AuthContext);
    const { changeErrorModalMsgState } = useContext(StateContext);
    const [isLiked, setIsLiked] = useState(() => post.likes.includes(auth._id));
    const { syncState } = useSyncStateWithNewPost();
    const [likeSpinnerState, setLikeSpinnerState] = useState(false);

    const { owner, imageURL, description, likes, _id } = post;


    async function onLike() {

        try {
            // If owner return
            if ((auth && auth._id === post?.owner?._id)) return;
            setLikeSpinnerState(true);

            const updatedPost = await likePost(_id);

            setIsLiked(true);
            syncState(updatedPost);
            setLikeSpinnerState(false);
        } catch (err) {
            console.error(err);
            setLikeSpinnerState(false);
            changeErrorModalMsgState(err.message);
        }

    }

    async function onDisLike() {
        try {
            // If owner return
            if ((auth && auth._id === post?.owner?._id)) return;
            setLikeSpinnerState(true);

            const updatedPost = await dislikePost(_id);

            setIsLiked(false);
            syncState(updatedPost);
            setLikeSpinnerState(false);
        } catch (err) {
            console.error(err);
            setLikeSpinnerState(false);
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

                    {/* Likes logic */}
                    {(auth && auth._id !== post?.owner?._id)
                        ? likeSpinnerState
                            ? <ButtonSpinner />
                            : <Heart isLiked={isLiked} onDisLike={onDisLike} onLike={onLike} />
                        : <span className={styles['svg-container']} ><HeartSolidSvg /></span>
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