import styles from './Post.module.css';
import { Details } from "./Details";

export const Post = () => {

    // async function test () {
    //     await navigator.clipboard.writeText('asd')
    // }

    return (
        <div className={styles['post-container']}>
            <Details />
        </div>
    );
}