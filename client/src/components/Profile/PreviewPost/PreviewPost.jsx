import styles from './PreviewPost.module.css';
import { CommentSvg } from '../../Svg/Comment';
import { HeartSolidSvg } from '../../Svg/HeartSolid';

//TODO... add the number of likes and comments 

export const PreviewPost = () => {
    return (
        <div className={styles['post']}>
            <img src="https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" alt="image" />
            <div className={styles['svg-container']}>
                <HeartSolidSvg />
                <span>0</span> 
                <CommentSvg />
                <span>0</span>
            </div>
        </div>
    );
};