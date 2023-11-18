import { Outlet } from 'react-router-dom';
import { PostCard } from './PostCard/PostCard';
import styles from './Explore.module.css';

export const Explore = () => {

    const urlAfterDetailsClose = '/explore'

    return (
        <>
            <Outlet context={[urlAfterDetailsClose]}></Outlet>
            <section className={styles['explore']}>
                <PostCard />
            </section>
        </>
    );
};