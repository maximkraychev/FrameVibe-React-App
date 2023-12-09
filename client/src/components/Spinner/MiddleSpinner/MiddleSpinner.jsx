import styles from './MiddleSpinner.module.css';
import { Spinner } from '../Spinner/Spinner';

export const MiddleSpinner = () => {
    return (
        <div className={styles['middle-spinner-container']}>
            <Spinner />
        </div>
    );
};