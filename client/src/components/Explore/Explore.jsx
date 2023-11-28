import { Outlet, useNavigate } from 'react-router-dom';

import { PATH } from '../../constants/paths';
import { DetailsContext } from '../../contexts/DetailsContext';

import styles from './Explore.module.css';
import { PostCard } from './PostCard/PostCard';

export const Explore = () => {
    const navigate = useNavigate();

    function handleUrlOnDetailsClose() {
        navigate(PATH.EXPLORE);
    };

    return (
        <>
            <DetailsContext.Provider value={handleUrlOnDetailsClose}>
                <Outlet ></Outlet>
            </DetailsContext.Provider>
            <section className={styles['explore']}>
                <PostCard />
            </section>
        </>
    );
};