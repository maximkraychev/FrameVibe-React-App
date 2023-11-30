import { useNavigate } from 'react-router-dom';
import styles from './Modal.module.css';

export const Modal = ({ children, ...props }) => {
    const navigation = useNavigate();

    function goBack() {
        navigation(-1);
    }

    return (
        <div className={styles['dimmer']} onClick={props.showHide ? props.showHide : goBack}>
            <div className={styles['modal-container']}>
                {children}
            </div>
        </div>
    );
}