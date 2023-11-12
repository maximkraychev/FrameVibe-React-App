import { useState } from 'react';
import styles from './UploadImage.module.css';

export const UploadImage = () => {

    const [fileName, setFileName] = useState('');


    function showSelectedFileName(e) {
        setFileName(e.target.value?.slice(-30));
    }


    return (
        <div className={styles['form-container']}>
            <form className={styles['upload-image-form']}>
                <h2>Image Upload</h2>
                <label htmlFor="upload-image" className={styles['label-for-upload-image']}>Select Image</label>
                <input type="file" name='uploadImage' id='upload-image' accept="image/png, image/jpeg" onChange={showSelectedFileName} />
                {fileName ||
                    <span id={styles['file-selected']}>{fileName}</span>
                }
                <textarea name='description' rows="6" cols="50"></textarea>
                <input type="submit" value={'Upload'} />
            </form>
        </div>
    );
};