import styles from './Modal.module.css';

export const Modal = ({ children, closeModal }) => {

    // !!!
    // This function execute only if the dimmer div is clicked 
    // That way the clicks inside child component after bubbling doesn't close the modal
    function closeTheModal(e) {
      
        if (e.target == e.currentTarget) {

            // In case the modal is used to show post details
            // From props we should have function closeModal
            // Execute closeModal to close the modal
            if (closeModal) {
                closeModal();
                return;
            }
           
            // In general use to close the modal 
            // Execute the function that will change the global state
            closeHandlerDetailsModal()
        }
    }

    return (
        <div className={styles['dimmer']} onClick={closeTheModal}>
            <div className={styles['modal-container']} >
                {children}
            </div>
        </div>
    );
}