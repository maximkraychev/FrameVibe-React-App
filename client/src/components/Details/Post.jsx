import { useLocation } from "react-router-dom";
import styles from './Post.module.css';
import { Details } from "./Details";

export const Post = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <div className={styles['post-container']}>
            <Details />
        </div>
    );
}