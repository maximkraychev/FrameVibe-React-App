import styles from './Modal.module.css';

export const Modal = ({children, ...props}) => {
    return (
        <div className={styles['dimmer']} onClick={props.showHide}>
            <div className={styles['modal-container']}>
               {children}
            </div>
        </div>
    );
}