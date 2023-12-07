import styles from './Post.module.css';
import { Details } from "./Details";

export const Post = () => {

    return (
        <div className={styles['post-container']}>
            <Details />
        </div>
    );
}