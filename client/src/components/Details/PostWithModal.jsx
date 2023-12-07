import { useNavigate } from "react-router-dom";

import styles from './PostWithModal.module.css';
import { Details } from "./Details";

export const PostWithModal = () => {

    const navigation = useNavigate();

    // !!!
    // This function execute only if the dimmer div is clicked 
    // That way the clicks inside child component after bubbling doesn't close the modal
    function closePostModal(e) {
        if (e.target == e.currentTarget) {
            navigation(-1);
        }
    }

    return (

        <div className={styles['dimmer-post-modal']} onClick={closePostModal}>
            <div className={styles['modal-container']} >
                <Details />
            </div>
        </div>


    )
};