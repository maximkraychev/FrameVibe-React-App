import { useContext } from 'react';

import { StateContext } from '../../contexts/StateContext';
import { STATE_FIELDS } from '../../constants/stateFieldsConstants';

import styles from './Modal.module.css';

export const Modal = ({ children }) => {

    const { state, changeModalState } = useContext(StateContext);

    // !!!
    // This function execute only if the dimmer div is clicked 
    // That way the clicks inside child component after bubbling doesn't close the modal
    function closeTheModal(e) {

        if (e.target == e.currentTarget) {
            changeModalState(false);
        }
    }

    return (
        <>
            {state[STATE_FIELDS.MODAL] &&
                <div className={styles['dimmer']} onClick={closeTheModal}>
                    <div className={styles['modal-container']} >
                        {children}
                    </div>
                </div>
            }
        </>
    );
}