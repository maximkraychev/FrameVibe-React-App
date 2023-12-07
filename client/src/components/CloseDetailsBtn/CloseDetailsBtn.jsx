import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Xmark } from "../Svg/Xmark";
import styles from './CloseDetails.module.css';

export const CloseDetailsBtn = () => {

    const [xMarkVisibility, setXMarkVisibility] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        // This will decide if the X svg-s will be showed 
        if (location.pathname.startsWith('/explore') || location.pathname.startsWith('/profile')) {
            setXMarkVisibility(true)
        }
    }, [])

    function handlerForClosingTheModalPost() {
        navigation(-1);
    }


    return (
        <>
            {xMarkVisibility &&
                <p className={styles['x-container']} onClick={handlerForClosingTheModalPost}>
                    <Xmark />
                </p>
            }
        </>
    );
};