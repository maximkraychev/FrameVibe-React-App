import styles from './PreviewPost.module.css';
import { CommentSvg } from '../../Svg/Comment';
import { HeartSolidSvg } from '../../Svg/HeartSolid';

//TODO... add the number of likes and comments 

export const PreviewPost = ({_id, likes, imageURL}) => {
    return (
        <div className={styles['post']}>
            <img src={imageURL} alt="image" />
            <div className={styles['svg-container']}>
                <HeartSolidSvg />
                <span>{likes.length}</span> 
                <CommentSvg />
                <span>0</span>
            </div>
        </div>
    );
};