import { useNavigate } from 'react-router-dom';

import styles from './Explore.module.css';
import { PostCard } from './PostCard/PostCard';
import { COMPONENT_NAMES } from '../../constants/componentsNames';

export const Explore = () => {
    const navigate = useNavigate();

    function showPostDetails() {
        // navigate("../p/test", { relative: "path", state: COMPONENT_NAMES.EXPLORE });
        navigate('/p/test', { state: COMPONENT_NAMES.EXPLORE });
    }

    return (
        <>
            <section className={styles['explore']}>
                <PostCard showPostDetails={showPostDetails} />
            </section>
        </>
    );
};