import { Spinner } from "../Spinner/Spinner";
import styles from './ButtonSpinner.module.css';

export const ButtonSpinner = () => {
    return (
        <div className={styles['button-spinner-container']}>
            <Spinner />
        </div>
    );
};