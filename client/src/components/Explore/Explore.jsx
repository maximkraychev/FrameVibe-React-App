import { Outlet } from 'react-router-dom';
import { PostCard } from './PostCard/PostCard';
import styles from './Explore.module.css';

export const Explore = () => {
    return (
        <>
            <Outlet></Outlet>
            <section className={styles['explore']}>
                <PostCard />
            </section>
        </>
    );
};