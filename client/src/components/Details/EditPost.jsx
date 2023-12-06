import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { StateContext } from "../../contexts/StateContext";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useForm } from "../../hooks/useForm";
import { getSinglePost, updatePost } from "../../services/postService";
import { submitBtnStateCheck } from "../../util/submitBtnStateCheck";
import { PARAMS, PATH } from "../../constants/paths";
import { INPUT_NAMES } from "../../constants/formInputNaming";
import { UPLOAD_FORM_VALIDATION } from "../../util/formValidations";

import styles from './EditPost.module.css';
import { SubmitBtn } from "../SubmitBtn/SubmitBtn";

const initialValues = {
    [INPUT_NAMES.DESCRIPTION]: ''
}

export const EditPost = () => {

    const params = useParams();
    const { state } = useContext(StateContext);
    const [currentPost, setCurrentPost] = useState('');
    const { values, changeHandler, onSubmit, changeValueByField } = useForm(initialValues, onSubmitHandler);
    const [submitError, setSubmitError] = useState('');
    const navigation = useNavigate();
    const { errorMessages, checkFieldForError } = useFormValidation(initialValues, UPLOAD_FORM_VALIDATION);
    const [submitButtonState, setSubmitButtonState] = useState(submitBtnStateCheck(values, errorMessages));

    useEffect(() => {
        let post = null;

        (async function getPost() {
            // Check for postId 
            if (!params[PARAMS.POSTID]) return;

            // Check if we already have the post in the StateContext
            const postFromState = state.posts.find((post) => post._id === params[PARAMS.POSTID]);

            // If we have the post from state make a new reference
            if (postFromState) {
                post = { ...postFromState }
            }

            // If the post owner is populated replace it only with userId
            if (post?.owner?._id) {
                const ownerId = post.owner._id;
                post.owner = ownerId;
            }

            // If we don't have the post make a new request for it
            if (!post) {
                post = await getSinglePost(params[PARAMS.POSTID]);
            }

            // Save the post
            setCurrentPost(post);

            // Populate every field from initialValues with data from post
            Object.keys(initialValues).forEach(key => changeValueByField(key, post[key]));

        })();

    }, [])

    useEffect(() => {
        setSubmitButtonState(submitBtnStateCheck(values, errorMessages));
    }, [values, errorMessages]);

    function onInputChange(e) {
        changeHandler(e);

        if (errorMessages[e.target.name]) {
            errorCheck(e);
        }
    }

    function errorCheck(e) {
        checkFieldForError(e.target.name, e.target.value);
    }

    async function onSubmitHandler() {
        try {
            const postForServer = { ...currentPost, ...values };
            const updatedPost = await updatePost(postForServer._id, values);
            navigation(PATH.POST_FN(updatedPost._id));
        } catch (err) {
            setSubmitError(err.message);
        }
    }

    return (
        <div className={styles['form-container']}>
            <form className={styles['upload-image-form']} onSubmit={onSubmit}>
                <h2>Edit Post</h2>

                <img
                    className={styles['image-preview']}
                    src={currentPost?.imageURL}
                    alt="Post-Image"
                />

                <p className={styles['error-field']}>{errorMessages[INPUT_NAMES.DESCRIPTION]}</p>
                <textarea name={INPUT_NAMES.DESCRIPTION} value={values[INPUT_NAMES.DESCRIPTION]} onChange={onInputChange} onBlur={errorCheck} rows="6" cols="50"></textarea>

                <p className={[styles['error-field'], styles['api-error']].join(' ')}>{submitError}</p>
                <SubmitBtn value={'Apply Changes'} active={submitButtonState} />
            </form>
        </div>
    );
};