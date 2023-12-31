import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';
import { StateContext } from '../../../contexts/StateContext';
import { deletePost, dislikePost, getSinglePost, likePost } from '../../../services/postService';
import { usePostStateExplore } from '../../../hooks/usePostStateExplore';
import { PARAMS, PATH } from '../../../constants/paths';
import { STATE_FIELDS } from '../../../constants/stateFieldsConstants';
import { SITE_TITLE } from '../../../constants/titles';


import styles from './Details.module.css';
import { CloseDetailsBtn } from '../../Buttons/CloseDetailsBtn/CloseDetailsBtn';
import { DeletePostModal } from '../../Modal/DeletePostModal/DeletePostModal';
import { Share } from '../../Buttons/Share/Share';
import { HeartSolidSvg } from '../../Svg/HeartSolid';
import { useSyncStateWithNewPost } from '../../../hooks/useSyncStateWithNewPost';
import { PageTitle } from '../../PageTitle/PageTitle';
import { MiddleSpinner } from '../../Spinner/MiddleSpinner/MiddleSpinner';
import { Heart } from '../../Buttons/Heart/Heart';
import { ButtonSpinner } from '../../Spinner/ButtonSpinner/ButtonSpinner';


export const Details = () => {

    const params = useParams();
    const location = useLocation();
    const navigation = useNavigate();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [likeSpinnerState, setLikeSpinnerState] = useState(false);
    const [deleteSpinnerState, setDeleteSpinnerState] = useState(false);
    const [spinnerState, setSpinnerState] = useState(true);
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
    const { auth, accessToken } = useContext(AuthContext);
    const { state, changeErrorModalMsgState } = useContext(StateContext);
    const { changeExplorePosts } = usePostStateExplore();
    const { syncState } = useSyncStateWithNewPost();


    useEffect(() => {
        // If we don't have a post in state make a request for post
        if (!location.state) {

            (async function getData() {
                try {
                    const currentPost = await getSinglePost(params[PARAMS.POSTID], accessToken);

                    setPost(currentPost);
                    setUser(currentPost.owner);
                    setSpinnerState(false);


                } catch (err) {
                    setSpinnerState(false);
                    console.error(err);
                    navigation('/not-found');
                }
            })();


        } else {
            // If we have  a post in state set the current post and user
            setPost(location.state);
            setUser(location.state?.owner);
            setSpinnerState(false);
        }

    }, []);

    useEffect(() => {
        if (auth) {
            setIsLiked(() => post.likes?.includes(auth._id));
        }
    }, [post]);

    function showDeleteModal(e) {
        e.preventDefault();
        setDeleteModalVisibility(true);
    }

    function hideDeleteModal() {
        setDeleteModalVisibility(false);
    }

    function deletePostHandler() {

        (async function deleteCurrentPost() {
            try {
                setDeleteSpinnerState(true);
                // Delete the post
                const deletedPost = await deletePost(post._id, accessToken);

                // Remove the post from Explore state 
                if (state[STATE_FIELDS.POSTS_EXPLORE].length > 0) {
                    const filtratedPosts = state[STATE_FIELDS.POSTS_EXPLORE].filter(post => post._id !== deletedPost._id);
                    changeExplorePosts(filtratedPosts);
                }


                // Hide Delete modal
                hideDeleteModal();

                setDeleteSpinnerState(false);

                // navigate to Explore
                navigation(PATH.EXPLORE);
            } catch (err) {
                console.error(err);
                setDeleteSpinnerState(false);
                changeErrorModalMsgState(err.message);
            }
        })();
    }


    // Like functionality

    async function onLike() {

        try {
            // If owner return
            if ((auth && auth._id === post?.owner?._id)) return;
            setLikeSpinnerState(true);

            const updatedPost = await likePost(post?._id, accessToken);

            // Set Like state
            setIsLiked(false);
            // Set current post state
            setPost(updatedPost);
            //Set global state
            syncState(updatedPost);
            setLikeSpinnerState(false);
        } catch (err) {
            console.error(err);
            setLikeSpinnerState(false);
            changeErrorModalMsgState(err.message);
        }

    }

    async function onDisLike() {
        try {
            // If owner return
            if ((auth && auth._id === post?.owner?._id)) return;
            setLikeSpinnerState(true);

            const updatedPost = await dislikePost(post?._id, accessToken);

            // Set Like state
            setIsLiked(false);
            // Set current post state
            setPost(updatedPost);
            //Set global state
            syncState(updatedPost);
            setLikeSpinnerState(false);
        } catch (err) {
            console.error(err);
            setLikeSpinnerState(false);
            changeErrorModalMsgState(err.message);
        }
    }

    return (
        <PageTitle title={SITE_TITLE.DETAILS}>

            {spinnerState

                ? <MiddleSpinner />

                : <>
                    <DeletePostModal state={deleteModalVisibility} hideDeleteModal={hideDeleteModal} deletePostHandler={deletePostHandler} spinnerState={deleteSpinnerState} />

                    {post &&
                        <div className={styles['details-container']}>
                            <div className={styles['owner-mobile']}>
                                <div className={styles['avatar-container-mobile']}>
                                    <img src={user?.avatar} alt="avatar" />
                                </div>
                                <p>{user?.username}</p>
                                <CloseDetailsBtn />
                            </div>


                            <div className={styles['image-container']}>
                                <img src={post?.imageURL} alt="main-image" />
                            </div>

                            <div className={styles['description-container']}>

                                <div className={styles['owner-desktop']}>
                                    <div className={styles['avatar-container-desktop']}>
                                        <img src={user?.avatar} alt="avatar" />
                                    </div>
                                    <p>{user?.username}</p>

                                    <CloseDetailsBtn />
                                </div>

                                <div className={styles['btn-container']}>
                                    <Share />
                                    {post?.owner?._id == auth?._id &&
                                        <>
                                            <Link to={PATH.POST_EDIT_FN(post?._id)} className={styles['edit-btn']}>Edit</Link>
                                            <Link onClick={showDeleteModal} className={styles['delete-btn']}>Delete</Link>
                                        </>
                                    }
                                </div>

                                <div className={styles['description']}>
                                    <p>
                                        {post?.description}
                                    </p>
                                </div>

                                {/* TODO..comments <div className={styles['comments']}></div> */}

                                <div className={styles['like-container']}>

                                    {/* Likes logic */}
                                    {(auth && auth._id !== post?.owner?._id)
                                        ? likeSpinnerState
                                            ? <ButtonSpinner />
                                            : <Heart isLiked={isLiked} onDisLike={onDisLike} onLike={onLike} />
                                        : <span className={styles['svg-container']} ><HeartSolidSvg /></span>
                                    }

                                    {post.likes && <p>{post.likes?.length} likes</p>}
                                </div>

                            </div>
                        </div>
                    }

                    {!post &&
                        <h4 className={styles['not-found-post']}>We couldn't locate the post you're looking for. It may have been deleted or doesn't exist.</h4>
                    }
                </>

            }

        </PageTitle>
    );
};