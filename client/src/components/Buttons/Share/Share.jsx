import { useParams } from "react-router-dom";
import { ShareSvg } from "../../Svg/ShareSvg";
import styles from './Share.module.css';
import { PARAMS, PATH } from "../../../constants/paths";
import { useState } from "react";

export const Share = () => {

    const [clipboardMsgVisualization, setClipboardMsgVisualization] = useState(false);
    const params = useParams();

    async function copyToClipboard() {
        try {
            if (params[PARAMS.POSTID]) {
                // Copy the link to clipboard
                await navigator.clipboard.writeText(PATH.CLIPBOARD_COPY_PATH_FN(params[PARAMS.POSTID]));

                // Show the msg
                setClipboardMsgVisualization(true);

                // After 2 sec hide the msg
                setTimeout(() => {
                    setClipboardMsgVisualization(false);
                }, 2000);
            }
        } catch (err) {
            console.log(err);
            //TODO handle the error            
        }
    }

    return (
        <>
            <p onClick={copyToClipboard} className={styles['share-svg-container']}>
                <ShareSvg />
                {clipboardMsgVisualization && <span className={styles['clipboard-msg']}>Copied!</span>}
            </p>

        </>
    );
};