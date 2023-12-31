import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { StateContext } from "../../../contexts/StateContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { useForm } from "../../../hooks/useForm";
import { useSyncStateWithNewPost } from "../../../hooks/useSyncStateWithNewPost";
import { getSinglePost, updateDetailsPost } from "../../../services/postService";
import { submitBtnStateCheck } from "../../../util/submitBtnStateCheck";
import { PARAMS, PATH } from "../../../constants/paths";
import { INPUT_NAMES } from "../../../constants/formInputNaming";
import { UPLOAD_FORM_VALIDATION } from "../../../util/formValidations";

import styles from './EditPost.module.css';
import { SubmitBtn } from "../../Buttons/SubmitBtn/SubmitBtn";
import { STATE_FIELDS } from "../../../constants/stateFieldsConstants";
import { PageTitle } from "../../PageTitle/PageTitle";
import { SITE_TITLE } from "../../../constants/titles";
import { MiddleSpinner } from "../../Spinner/MiddleSpinner/MiddleSpinner";

const initialValues = {
    [INPUT_NAMES.DESCRIPTION]: ''
}

export const EditPost = () => {

    const params = useParams();
    const navigation = useNavigate();
    const { state, changeErrorModalMsgState } = useContext(StateContext);
    const [currentPost, setCurrentPost] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [spinnerState, setSpinnerState] = useState(true);
    const { values, changeHandler, onSubmit, changeValueByField } = useForm(initialValues, onSubmitHandler);
    const { errorMessages, checkFieldForError } = useFormValidation(initialValues, UPLOAD_FORM_VALIDATION);
    const { syncState } = useSyncStateWithNewPost();
    const [submitButtonState, setSubmitButtonState] = useState(submitBtnStateCheck(values, errorMessages));
    const [btnLoadingState, setBtnLoadingState] = useState(false);
    const { accessToken } = useContext(AuthContext)

    useEffect(() => {
        let post = null;

        (async function getPost() {

            try {
                // Check if we already have the post in the StateContext in Explore
                let postFromState = state[STATE_FIELDS.POSTS_EXPLORE].find((post) => post._id === params[PARAMS.POSTID]);

                // If we still don't have the post check the state from Profile
                if (!postFromState) {
                    postFromState = state[STATE_FIELDS.POSTS_PROFILE].find((post) => post._id === params[PARAMS.POSTID]);
                }

                // If we have the post from state make a new reference
                if (postFromState) {
                    post = { ...postFromState }
                }

                // If we don't have the post make a new request for it
                if (!post) {
                    post = await getSinglePost(params[PARAMS.POSTID], accessToken);
                }

                // Save the post
                setCurrentPost(post);

                // Populate every field from initialValues with data from post
                Object.keys(initialValues).forEach(key => changeValueByField(key, post[key]));

                // Stop spinner;
                setSpinnerState(false);
            } catch (err) {
                console.error(err);
                setSpinnerState(false);
                changeErrorModalMsgState(err.message);
            }

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
            setBtnLoadingState(true);
            const postForServer = { ...currentPost, ...values };
            const updatedPost = await updateDetailsPost(postForServer._id, accessToken, values);

            // Sync the new data
            syncState(updatedPost);

            navigation(PATH.POST_FN(updatedPost._id), { state: updatedPost });
        } catch (err) {
            setSubmitError(err.message);
            setBtnLoadingState(false);
        }
    }

    return (
        <PageTitle title={SITE_TITLE.EDIT_POST}>

            {spinnerState

                ? <MiddleSpinner />

                : <div className={styles['form-container']}>
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
                        <div className={styles['submit-btn-container']}>
                            <SubmitBtn value={'Apply Changes'} active={submitButtonState} loading={btnLoadingState} />
                        </div>
                    </form>
                </div>
            }

        </PageTitle>
    );
};