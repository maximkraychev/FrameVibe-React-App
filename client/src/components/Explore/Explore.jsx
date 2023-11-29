import { Outlet, useNavigate } from 'react-router-dom';

import { PATH } from '../../constants/paths';
import { DetailsContext } from '../../contexts/DetailsContext';
import { useModalUrlAndNavigation } from '../../hooks/useModalUrlAndNavigation';

import styles from './Explore.module.css';
import { PostCard } from './PostCard/PostCard';

export const Explore = () => {

    const { handleUrlOnDetailsClose } = useModalUrlAndNavigation(PATH.EXPLORE);


    const navigate = useNavigate();

    function testFunction() {
        navigate('/p/test', { state: 'test' })
    }

    return (
        <>
            <DetailsContext.Provider value={handleUrlOnDetailsClose}>
                <Outlet ></Outlet>
            </DetailsContext.Provider>
            <section className={styles['explore']}>
                <PostCard testFunction={testFunction} />
            </section>
        </>
    );
};