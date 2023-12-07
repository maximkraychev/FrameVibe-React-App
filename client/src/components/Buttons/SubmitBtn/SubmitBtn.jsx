import styles from './SubmitBtn.module.css';

export const SubmitBtn = ({ value, active }) => {

    return (
        <input
            className={[styles['submit-btn'], [styles[active ? 'active' : 'disabled']]].join(' ')}
            type="submit"
            value={value}
            disabled={active ? '' : 'disabled'} />
    );
};