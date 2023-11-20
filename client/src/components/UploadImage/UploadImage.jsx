import { useState } from 'react';
import styles from './UploadImage.module.css';

export const UploadImage = () => {

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles['form-container']}>
            <form className={styles['upload-image-form']}>
                <h2>Image Upload</h2>
                <label htmlFor="upload-image" className={styles['label-for-upload-image']}>Select Image</label>
                <input type="file" name='uploadImage' id='upload-image' accept="image/png, image/jpeg" onChange={handleImageChange} />
                {previewImage && (
                    <img
                        className={styles['image-preview']}
                        src={previewImage}
                        alt="Preview"
                    />
                )}
                <textarea name='description' rows="6" cols="50"></textarea>
                <input type="submit" value={'Upload'} />
            </form>
        </div>
    );
};