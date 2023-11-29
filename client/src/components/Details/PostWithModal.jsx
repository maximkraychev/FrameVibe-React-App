import { useContext } from 'react';

import { useModalState } from '../../hooks/useModalState';
import { DetailsContext } from '../../contexts/DetailsContext';

import styles from './Details.module.css';
import { Xmark } from '../Svg/Xmark';
import { Modal } from '../Modal/Modal';
import { Details } from './Details';

export const PostWithModal = () => {
    const { isVisible, reverseVisibilityState } = useModalState();
    const handleUrlOnDetailsClose = useContext(DetailsContext);
    
    useHis

    function changeVisibility() {
        reverseVisibilityState();

        if (handleUrlOnDetailsClose) {
            handleUrlOnDetailsClose();
        }
    }

    return (
        <>
            {isVisible &&
                <Modal showHide={changeVisibility}>
                    <Details />
                </Modal>
            }
        </>
    );
};