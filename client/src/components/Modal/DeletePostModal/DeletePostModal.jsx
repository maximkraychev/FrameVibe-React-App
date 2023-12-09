import { Modal } from "../Modal/Modal";
import styles from './DeletePostModal.module.css';

export const DeletePostModal = ({ state, hideDeleteModal, deletePostHandler }) => {


    return (
        <>
            {state &&
                <Modal closeHandler={hideDeleteModal}>
                    <div className={styles['delete-post-container']}>
                        <h5>Delete this post? Confirm?</h5>
                        <div className={styles['btn-container']}>
                            <button className={styles['delete-btn']} onClick={deletePostHandler}>Delete</button>
                            <button className={styles['cancel-btn']} onClick={hideDeleteModal}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};