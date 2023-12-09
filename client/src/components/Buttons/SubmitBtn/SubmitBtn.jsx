import { Spinner } from '../../Spinner/Spinner/Spinner';
import styles from './SubmitBtn.module.css';

export const SubmitBtn = ({ value, active, loading }) => {

    return (
        <>
            {
                loading
                    // Loader 
                    ? <div className={styles['spinner-container']}><Spinner /></div>

                    // Btn
                    : <input
                        className={[styles['submit-btn'], [styles[active ? 'active' : 'disabled']]].join(' ')
                        }
                        type="submit"
                        value={value}
                        disabled={active ? '' : 'disabled'} />
            }
        </>

    );
};