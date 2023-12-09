import { HeartSvg } from "../../Svg/Heart";
import { HeartSolidSvg } from "../../Svg/HeartSolid";
import styles from './Heart.module.css';

export const Heart = ({ isLiked, onDisLike, onLike }) => {
    return (
        <>
            {isLiked
                ? <span
                    className={styles['svg-container']}
                    onClick={onDisLike}>
                    <HeartSolidSvg />
                </span>
                : <span
                    className={styles['svg-container']}
                    onClick={onLike}>
                    <HeartSvg />
                </span>
            }
        </>
    );
};