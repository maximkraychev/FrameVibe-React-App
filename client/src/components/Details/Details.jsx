import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { StateContext } from '../../contexts/StateContext';
import { getSinglePost } from '../../services/postService';
import { PARAMS, PATH } from '../../constants/paths';

import styles from './Details.module.css';
import { CloseDetailsBtn } from '../Buttons/CloseDetailsBtn/CloseDetailsBtn';
import { DeletePostModal } from '../Modal/DeletePostModal/DeletePostModal';
import { Share } from '../Share/Share';

export const Details = () => {

    const params = useParams();
    const location = useLocation();
    const navigation = useNavigate();
    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const { auth } = useContext(AuthContext);
    const { changeModalState } = useContext(StateContext)

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
        console.log('show');
    }

    function hideDeleteModal() {
        changeModalState(false);
        console.log('hide');
    }

    function deletePostHandler() {
        console.log('delete');
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
                            <Link to={PATH.POST_EDIT_FN(post?._id)}  className={styles['edit-btn']}>Edit</Link>
                            <Link onClick={showDeleteModal} className={styles['delete-btn']}>Delete</Link>
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