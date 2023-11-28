import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import styles from './Details.module.css';
import { Xmark } from '../Svg/Xmark';
import { Modal } from '../Modal/Modal';

export const Details = () => {
    const navigate = useNavigate();
    const [isVisible, setVisible] = useState(true);

    const [urlAfterClose] = useOutletContext();

    function changeVisibility() {
        setVisible((oldValue) => !oldValue);
        navigate(urlAfterClose);
        // navigate(-1)  --> its not working if we come from a link directly to details
    }

    return (
        <>
            {isVisible &&
                <Modal showHide={changeVisibility}>
                    <div className={styles['details-container']}>
                        <div className={styles['owner-mobile']}>
                            <div className={styles['avatar-container-mobile']}>
                                <img src="https://images.unsplash.com/photo-1698778755079-a76db5955d2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="avatar" />
                            </div>
                            <p>Username</p>
                            <Xmark onClick={changeVisibility} />
                        </div>

                        <div className={styles['image-container']}>
                            {/* <img src="https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" alt="main-image" /> */}
                            <img src="https://images.unsplash.com/photo-1698778755357-63abc1fe986f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="main-image" />
                        </div>

                        <div className={styles['description-container']}>
                            <div className={styles['owner-desktop']}>
                                <div className={styles['avatar-container-desktop']}>
                                    <img src="https://images.unsplash.com/photo-1698778755079-a76db5955d2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="avatar" />
                                </div>
                                <p>Username</p>
                                <Xmark onClick={changeVisibility} />
                            </div>
                            <div className={styles['description']}>
                                <p>
                                    It was fun thinking about how this should be viewed from the perspective of a component. It basically takes a window size and increases/decreases the pagination window on each click
                                </p>
                            </div>

                            {/* <div className={styles['comments']}></div> */}

                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};