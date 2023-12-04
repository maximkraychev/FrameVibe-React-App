import { useDetailsModal } from '../../hooks/useDetailsModal';
import styles from './Modal.module.css';

export const Modal = ({ children }) => {
    const { closeHandlerDetailsModal } = useDetailsModal();


    return (
        <div className={styles['dimmer']} onClick={closeHandlerDetailsModal}>
            <div className={styles['modal-container']}>
                {children}
            </div>
        </div>
    );
}