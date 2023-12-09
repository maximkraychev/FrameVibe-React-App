import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { StateContext } from '../../../contexts/StateContext';
import { usePostStateExplore } from '../../../hooks/usePostStateExplore';
import { getAllPosts } from '../../../services/postService';
import { STATE_FIELDS } from '../../../constants/stateFieldsConstants';
import { SITE_TITLE } from '../../../constants/titles';

import styles from './Explore.module.css';
import { PostCard } from '../PostCard/PostCard';
import { PageTitle } from '../../PageTitle/PageTitle';

export const Explore = () => {

    const { changeExplorePosts } = usePostStateExplore();
    const { state, changeErrorModalMsgState } = useContext(StateContext);

    useEffect(() => {

        getAllPosts()
            .then(posts => changeExplorePosts(posts))
            .catch(err => {
                console.error(err);
                changeErrorModalMsgState(err.message);
            })

    }, [])

    return (
        <PageTitle title={SITE_TITLE.EXPLORE}>

            <section className={styles['explore']}>
                {state[STATE_FIELDS.POSTS_EXPLORE].map(post => <PostCard key={post._id} post={post} />)}
            </section>
            <Outlet></Outlet>

        </PageTitle>
    );
};