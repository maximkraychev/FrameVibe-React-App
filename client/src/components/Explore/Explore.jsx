import { useContext, useEffect } from 'react';

import { StateContext } from '../../contexts/StateContext';
import { getAllPosts } from '../../services/postService';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';

import styles from './Explore.module.css';
import { PostCard } from './PostCard/PostCard';

export const Explore = () => {

    const { state, changePostState, changeBackgroundComponent } = useContext(StateContext);

    useEffect(() => {
        getAllPosts()
            .then(posts => changePostState(posts))
            .catch(err => {
                console.log(err);
                //TODO handle error
            })

            return () => changeBackgroundComponent(Explore);
    }, [])

    return (
        <>
            <section className={styles['explore']}>
                {state[STATE_FIELDS.POSTS].map(post => <PostCard key={post._id} {...post} />)}
            </section>
        </>
    );
};