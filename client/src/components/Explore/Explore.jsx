import { useContext, useEffect } from 'react';

import { StateContext } from '../../contexts/StateContext';
import { getAllPosts } from '../../services/postService';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';

import styles from './Explore.module.css';
import { PostCard } from './PostCard/PostCard';
import { PostWithModal } from '../Details/PostWithModal';

export const Explore = () => {

    const { state, changePostsState } = useContext(StateContext);

    useEffect(() => {
        getAllPosts()
            .then(posts => changePostsState(posts))
            .catch(err => {
                console.log(err);
                //TODO handle error
            })

    }, [])

    return (
        <>
            <section className={styles['explore']}>
                {state[STATE_FIELDS.POSTS].map(post => <PostCard key={post._id} post={post} />)}
            </section>
            {state[STATE_FIELDS.DETAILS_VISIBILITY] && <PostWithModal />}
        </>
    );
};