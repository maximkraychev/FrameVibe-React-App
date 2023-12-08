import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { createPost } from '../../../services/postService';
import { submitBtnStateCheck } from '../../../util/submitBtnStateCheck';
import { UPLOAD_FORM_VALIDATION } from '../../../util/formValidations';
import { INPUT_NAMES } from '../../../constants/formInputNaming';
import { PATH } from '../../../constants/paths';
import { SITE_TITLE } from '../../../constants/titles';

import styles from './CreatePost.module.css';
import { SubmitBtn } from '../../Buttons/SubmitBtn/SubmitBtn';
import { PageTitle } from '../../PageTitle/PageTitle';

const initialValues = {
    // The current form validation abstraction does not allow empty fields
    // Hacky way: initial value to be one space
    // TODO find a way to fix it!
    [INPUT_NAMES.DESCRIPTION]: ' ',
    [INPUT_NAMES.UPLOAD_IMAGE]: ''
}

export const CreatePost = () => {
    const { values, changeHandler, onSubmit } = useForm(initialValues, uploadImageSubmitHandler);
    const [previewImage, setPreviewImage] = useState(null);
    const [submitError, setSubmitError] = useState('');
    const navigation = useNavigate();
    const { errorMessages, errorVisibility, checkFieldForError, changeErrorVisibility, setManualErrorOnField } = useFormValidation(initialValues, UPLOAD_FORM_VALIDATION);
    const [submitButtonState, setSubmitButtonState] = useState(submitBtnStateCheck(values, errorMessages));

    useEffect(() => {
        setSubmitButtonState(submitBtnStateCheck(values, errorMessages));
    }, [values, errorMessages]);

    const handleImageChange = (e) => {
        onInputChange(e);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            }

            reader.onerror = (e) => {
                console.error('Error reading the file:', e.target.error);
                // TODO find a way to broke it and figure out what values we've got and handle it

            };

            reader.readAsDataURL(invalidBlob);
        }
    };

    async function uploadImageSubmitHandler(formData) {
        try {
            // Using FormData sending the description adn the image to the back-end
            const dataForServer = new FormData();
            dataForServer.append(INPUT_NAMES.DESCRIPTION, formData[INPUT_NAMES.DESCRIPTION]);
            dataForServer.append(INPUT_NAMES.UPLOAD_IMAGE, formData[INPUT_NAMES.UPLOAD_IMAGE]);

            const newPostData = await createPost(dataForServer);

            navigation(PATH.POST_FN(newPostData?._id), { state: newPostData });
        } catch (err) {
            setSubmitError(err.message);
        }
    }

    function onInputChange(e) {
        changeHandler(e);
        checkFieldForError(e.target.name, e.target.value);
    }

    function showError(e) {
        changeErrorVisibility(e.target.name);
    }

    return (
        <PageTitle title={SITE_TITLE.CREATE_POST}>
            <div className={styles['form-container']}>
                <form className={styles['upload-image-form']} onSubmit={onSubmit} encType="multipart/form-data">
                    <h2>Create Post</h2>
                    <label htmlFor="upload-image" className={styles['label-for-upload-image']}>Select Image</label>
                    <input type="file" name={INPUT_NAMES.UPLOAD_IMAGE} id='upload-image' accept="image/png, image/jpeg" onChange={handleImageChange} />

                    <p className={styles['error-field']}>{errorVisibility[INPUT_NAMES.UPLOAD_IMAGE] && errorMessages[INPUT_NAMES.UPLOAD_IMAGE]}</p>
                    {previewImage && (
                        <img
                            className={styles['image-preview']}
                            src={previewImage}
                            alt="Preview"
                        />
                    )}

                    <p className={styles['error-field']}>{errorVisibility[INPUT_NAMES.DESCRIPTION] && errorMessages[INPUT_NAMES.DESCRIPTION]}</p>
                    <textarea name={INPUT_NAMES.DESCRIPTION} value={values[INPUT_NAMES.DESCRIPTION]} onChange={onInputChange} onBlur={showError} rows="6" cols="50"></textarea>

                    <p className={[styles['error-field'], styles['api-error']].join(' ')}>{submitError}</p>
                    <SubmitBtn value={'Upload'} active={submitButtonState} />
                </form>
            </div>
        </PageTitle>
    );
};