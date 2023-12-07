import { Link } from 'react-router-dom';
import { HeartSvg } from '../../Svg/Heart';
import styles from './PostCard.module.css';
import { usePostModal } from '../../../hooks/usePostModal';

export const PostCard = ({ post }) => {

    const { loadPostForModal } = usePostModal()
    const { owner, imageURL, description, likes, _id } = post;

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
                    <Link to={`/explore/${_id}`} onClick={loadPostForModal.bind(null, post)}>
                        <img src={imageURL} alt="main-image" />
                    </Link>
                </div>
                <div className={styles['actions']}>
                    <HeartSvg />
                    <p>{likes?.length} likes</p>
                </div>
                <p className={styles['description']}>
                    {description}
                </p>
            </div>
        </>
    );
};