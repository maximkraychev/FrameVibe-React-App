import { Outlet } from 'react-router-dom';

import { PATH } from '../../constants/paths';

import styles from './Explore.module.css';
import { PostCard } from './PostCard/PostCard';

export const Explore = () => {

    const urlAfterDetailsClose = PATH.EXPLORE;

    return (
        <>
            <Outlet context={[urlAfterDetailsClose]}></Outlet>
            <section className={styles['explore']}>
                <PostCard />
            </section>
        </>
    );
};