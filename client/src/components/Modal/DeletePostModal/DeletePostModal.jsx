import { Modal } from "../Modal";
import styles from './DeletePostModal.module.css';

export const DeletePostModal = ({ hideDeleteModal, deletePostHandler }) => {


    return (
        <Modal>
            <div className={styles['delete-post-container']}>
                <h5>Delete this post? Confirm?</h5>
                <div className={styles['btn-container']}>
                    <button className={styles['delete-btn']} onClick={deletePostHandler}>Delete</button>
                    <button className={styles['cancel-btn']} onClick={hideDeleteModal}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
};