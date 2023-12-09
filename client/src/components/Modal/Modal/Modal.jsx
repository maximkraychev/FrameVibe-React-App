import styles from './Modal.module.css';

export const Modal = ({ children, closeHandler }) => {

    // !!!
    // This function execute only if the dimmer div is clicked 
    // That way the clicks inside child component after bubbling doesn't close the modal
    function closeTheModal(e) {

        if (e.target == e.currentTarget) {
            closeHandler();

        }
    }

    return (
        <>
            <div className={styles['dimmer']} onClick={closeTheModal}>
                <div className={styles['modal-container']} >
                    {children}
                </div>
            </div>
        </>
    );
}