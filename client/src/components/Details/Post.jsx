import { useFindBackgroundComponent } from "../../hooks/useFindBackgroundComponent";
import { useLocation, useParams } from "react-router-dom";

import styles from './Post.module.css';
import { Details } from "./Details";
import { Modal } from "../Modal/Modal";
import { PARAMS } from "../../constants/paths";

export const Post = () => {
    const backgroundComponent = useFindBackgroundComponent(); // This is a reference to component;
    const location = useLocation();
    const params = useParams();
    const postState = location.state
    console.log(postState);

    return (
        <>
            {backgroundComponent &&
                <>
                    <Modal>
                        <Details postId={params[PARAMS.POSTID]} postState={postState}/>
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