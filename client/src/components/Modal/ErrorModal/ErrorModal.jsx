import { useContext } from "react";

import { StateContext } from "../../../contexts/StateContext";
import { STATE_FIELDS } from "../../../constants/stateFieldsConstants";

import styles from './ErrorModal.module.css';
import { Modal } from "../Modal/Modal";


export const ErrorModal = () => {

    const { state, changeErrorModalMsgState } = useContext(StateContext);

    function hideErrorModal() {
        changeErrorModalMsgState('');
    }

    function reloadPage() {
        window.location.reload();
    }

    return (
        <>
            {state[STATE_FIELDS.ERROR_MODAL] &&
                <Modal closeHandler={hideErrorModal}>
                    <div className={styles['main-error-container']}>
                        <div className={styles['err-msg-container']}>
                            <p>{state[STATE_FIELDS.ERROR_MODAL]}</p>
                        </div>
                        <div className={styles['btn-container']}>
                            <button className={styles['reload-btn']} onClick={reloadPage}>Reload</button>
                            <button className={styles['hide-btn']} onClick={hideErrorModal}>Hide</button>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};