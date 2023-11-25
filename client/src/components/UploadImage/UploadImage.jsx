import { useState } from 'react';

import styles from './UploadImage.module.css';
import { INPUT_NAMES } from '../../constants/formInputNaming';
import { useFormReducer } from '../../hooks/useFormReducer';

const initialFormState = {
    [INPUT_NAMES.UPLOAD_IMAGE]: '',
    [INPUT_NAMES.DESCRIPTION]: ''
}

export const UploadImage = () => {
    const { values, changeHandler, onSubmit } = useFormReducer(initialFormState, uploadImageSubmitHandler);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        changeHandler(event, 'IMAGE_FORM');
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

    function uploadImageSubmitHandler(formData) {
            console.log(formData);
        // console.log(previewImage);
    }

    return (
        <div className={styles['form-container']}>
            <form className={styles['upload-image-form']} onSubmit={onSubmit}>
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