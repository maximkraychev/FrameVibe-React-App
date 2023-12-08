import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { StateContext } from '../../contexts/StateContext';
import { deletePost, getSinglePost } from '../../services/postService';
import { PARAMS, PATH } from '../../constants/paths';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';
import { usePostStateExplore } from '../../hooks/usePostStateExplore';

import styles from './Details.module.css';
import { CloseDetailsBtn } from '../Buttons/CloseDetailsBtn/CloseDetailsBtn';
import { DeletePostModal } from '../Modal/DeletePostModal/DeletePostModal';
import { Share } from '../Buttons/Share/Share';


export const Details = () => {

    const params = useParams();
    const location = useLocation();
    const navigation = useNavigate();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const { auth } = useContext(AuthContext);
    const { state, changeModalState } = useContext(StateContext);
    const { changeExplorePosts } = usePostStateExplore()

    useEffect(() => {

        // If we don't have a post in state make a request for post
        if (!location.state) {

            (async function getData() {
                try {
                    if (params[PARAMS.POSTID]) {
                        const currentPost = await getSinglePost(params[PARAMS.POSTID]);

                        setPost(currentPost);
                        setUser(currentPost.owner);
                    }

                } catch (err) {
                    console.log(err);
                    navigation('/not-found');
                    //TODO handle the error
                }
            })();


        } else {
            // If we have  a post in state set the current post and user
            setPost(location.state);
            setUser(location.state?.owner);
        }

    }, []);

    function showDeleteModal(e) {
        e.preventDefault();
        changeModalState(true);
    }

    function hideDeleteModal() {
        changeModalState(false);
    }

    function deletePostHandler() {

        (async function deleteCurrentPost() {
            try {
                // Delete the post
                const deletedPost = await deletePost(post._id);

                // Remove the post from Explore state 
                if (state[STATE_FIELDS.POSTS_EXPLORE].length > 0) {
                    const filtratedPosts = state[STATE_FIELDS.POSTS_EXPLORE].filter(post => post._id !== deletedPost._id);
                    changeExplorePosts(filtratedPosts);
                }

                // Hide Delete modal
                hideDeleteModal();

                // navigate to Explore
                navigation(PATH.EXPLORE);
            } catch (err) {
                console.log(err);
                //TODO handle it;
            }
        })();
    }

    return (
        <>
            <DeletePostModal hideDeleteModal={hideDeleteModal} deletePostHandler={deletePostHandler} />

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

                    </div>
                </div>
            }

            {!post &&
                <h4 className={styles['not-found-post']}>We couldn't locate the post you're looking for. It may have been deleted or doesn't exist.</h4>
            }
        </>
    );
};