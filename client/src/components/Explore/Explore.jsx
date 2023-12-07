import { useContext, useEffect } from 'react';

import { StateContext } from '../../contexts/StateContext';
import { getAllPosts } from '../../services/postService';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';

import styles from './Explore.module.css';
import { PostCard } from './PostCard/PostCard';
import { AuthContext } from '../../contexts/AuthContext';
import { usePostStateExplore } from '../../hooks/usePostStateExplore';
import { Outlet } from 'react-router-dom';

export const Explore = () => {

    // const { state, changePostsStateExplore } = useContext(StateContext);
    const { setUser } = useContext(AuthContext);
    const { state, changeExplorePosts } = usePostStateExplore();

    useEffect(() => {

        getAllPosts()
            .then(posts => changeExplorePosts(posts))
            .catch(err => {
                console.log(err);
                setUser()
                //TODO handle error
            })

    }, [])

    return (
        <>
            <section className={styles['explore']}>
                {state[STATE_FIELDS.POSTS_EXPLORE].map(post => <PostCard key={post._id} post={post} />)}
            </section>
            <Outlet></Outlet>
        </>
    );
};