import styles from './Details.module.css';
import { Xmark } from '../Svg/Xmark';
import { useState } from 'react';

export const Details = (props) => {

    const [postState, setPostState] = useState(props.postState || {});
    console.log(props);

    return (
        <>
            <div className={styles['details-container']}>
                <div className={styles['owner-mobile']}>
                    <div className={styles['avatar-container-mobile']}>
                        <img src={postState?.user?.avatar} alt="avatar" />
                    </div>
                    <p>{postState?.user?.username}</p>
                    {props.changeVisibility && <Xmark onClick={changeVisibility} />}
                </div>

                <div className={styles['image-container']}>
                    {/* <img src="https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" alt="main-image" /> */}
                    {/* <img src="https://images.unsplash.com/photo-1698778755357-63abc1fe986f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="main-image" /> */}
                    <img src={postState?.post?.imageUrl} alt="main-image" />
                </div>

                <div className={styles['description-container']}>
                    <div className={styles['owner-desktop']}>
                        <div className={styles['avatar-container-desktop']}>
                            <img src={postState?.user?.avatar} alt="avatar" />
                        </div>
                        <p>{postState?.user?.username}</p>
                        {props.changeVisibility && <Xmark onClick={changeVisibility} />}
                    </div>
                    <div className={styles['description']}>
                        <p>
                           {postState?.post?.description}
                        </p>
                    </div>

                    {/* <div className={styles['comments']}></div> */}

                </div>
            </div>
        </>
    );
};