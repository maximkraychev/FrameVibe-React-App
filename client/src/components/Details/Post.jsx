import { useContext } from "react";

import { StateContext } from "../../contexts/StateContext";
import { STATE_FIELDS } from "../../constants/stateFieldsConstants";

import styles from './Post.module.css';
import { Details } from "./Details";
import { Modal } from "../Modal/Modal";

export const Post = () => {
    const { state } = useContext(StateContext);

    return (
        <>
            {state[STATE_FIELDS.COMPONENT] &&
                <>
                    <Modal>
                        <Details />
                    </Modal>
                    {state[STATE_FIELDS.COMPONENT]()}
                </>
            }

            {!state[STATE_FIELDS.COMPONENT] &&
                <div className={styles['post-container']}>
                    <Details />
                </div>
            }
        </>
    );
}