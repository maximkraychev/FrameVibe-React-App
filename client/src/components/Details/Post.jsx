import { useFindBackgroundComponent } from "../../hooks/useFindBackgroundComponent";

import styles from './Post.module.css';
import { Details } from "./Details";
import { Modal } from "../Modal/Modal";

export const Post = () => {
    const backgroundComponent = useFindBackgroundComponent(); // This is a reference to component;

    return (
        <>
            {backgroundComponent &&
                <>
                    <Modal>
                        <Details />
                    </Modal>
                    {backgroundComponent()}
                </>
            }

            {!backgroundComponent &&
                <div className={styles['post-container']}>
                    <Details />
                </div>
            }
        </>
    );
}