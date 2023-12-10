import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { StateContext } from '../../../contexts/StateContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { usePostStateExplore } from '../../../hooks/usePostStateExplore';
import { getAllPosts } from '../../../services/postService';
import { STATE_FIELDS } from '../../../constants/stateFieldsConstants';
import { SITE_TITLE } from '../../../constants/titles';

import styles from './Explore.module.css';
import { PostCard } from '../PostCard/PostCard';
import { PageTitle } from '../../PageTitle/PageTitle';
import { MiddleSpinner } from '../../Spinner/MiddleSpinner/MiddleSpinner';

export const Explore = () => {

    const { changeExplorePosts } = usePostStateExplore();
    const { state, changeErrorModalMsgState } = useContext(StateContext);
    const { accessToken } = useContext(AuthContext);
    const [spinnerState, setSpinnerState] = useState(true);

    useEffect(() => {

        getAllPosts(accessToken)
            .then(posts => {
                changeExplorePosts(posts);
                setSpinnerState(false);
            })
            .catch(err => {
                console.error(err);
                setSpinnerState(false);
                changeErrorModalMsgState(err.message);
            })

    }, [])

    return (
        <PageTitle title={SITE_TITLE.EXPLORE}>

            {spinnerState

                ? <MiddleSpinner />

                : <>
                    <section className={styles['explore']}>
                        {state[STATE_FIELDS.POSTS_EXPLORE].map(post => <PostCard key={post._id} post={post} />)}
                    </section>
                    <Outlet></Outlet>
                </>
            }

        </PageTitle>
    );
};