import { useState } from 'react';

import styles from './UploadImage.module.css';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { createPost } from '../../services/postService';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/paths';

const initialFormState = {
    [INPUT_NAMES.DESCRIPTION]: '',
    [INPUT_NAMES.UPLOAD_IMAGE]: ''
}

export const UploadImage = () => {
    const { values, changeHandler, onSubmit } = useForm(initialFormState, uploadImageSubmitHandler);
    const [previewImage, setPreviewImage] = useState(null);
    const navigation = useNavigate();

    const handleImageChange = (event) => {
        changeHandler(event);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };

            reader.onerror = (e) => {
                console.error('Error reading the file:', e.target.error);
                // TODO add modal that shows the error message; 
            };

            reader.readAsDataURL(file);
        }
    };

    async function uploadImageSubmitHandler(formData) {
        // Using FormData sending the description adn the image to the back-end
        const dataForServer = new FormData();
        dataForServer.append(INPUT_NAMES.DESCRIPTION, formData[INPUT_NAMES.DESCRIPTION]);
        dataForServer.append(INPUT_NAMES.UPLOAD_IMAGE, formData[INPUT_NAMES.UPLOAD_IMAGE]);
     
        const newPostData = await createPost(dataForServer);
        navigation(PATH.POST_FN(newPostData?._id));
    }

    return (
        <div className={styles['form-container']}>
            <form className={styles['upload-image-form']} onSubmit={onSubmit} encType="multipart/form-data">
                <h2>Image Upload</h2>
                <label htmlFor="upload-image" className={styles['label-for-upload-image']}>Select Image</label>
                <input type="file" name={INPUT_NAMES.UPLOAD_IMAGE} id='upload-image' accept="image/png, image/jpeg" onChange={handleImageChange} />
                {previewImage && (
                    <img
                        className={styles['image-preview']}
                        src={previewImage}
                        alt="Preview"
                    />
                )}
                <textarea name={INPUT_NAMES.DESCRIPTION} value={values[INPUT_NAMES.DESCRIPTION]} onChange={changeHandler} rows="6" cols="50"></textarea>
                <input type="submit" value={'Upload'} />
            </form>
        </div>
    );
};