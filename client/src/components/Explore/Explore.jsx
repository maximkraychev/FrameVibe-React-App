import { PostCard } from './PostCard/PostCard';
import styles from './Explore.module.css';

export const Explore = () => {
    return (
        <section className={styles['explore']}>
            <PostCard />
        </section>
    );
};