import heartRegular from '../../assets/heart-regular.svg';
import styles from './PostCard.module.css';

export const PostCard = () => {
    return (
        <>
            <div className={styles['card']}>
                <header>
                    <div className={styles['avatar-container']}>
                        <img src="https://images.unsplash.com/photo-1698778755079-a76db5955d2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="avatar" />
                    </div>
                    <p className={styles['username']}>Test</p>
                    <button>View Profile</button>
                </header>
                <div className={styles['image-container']}>
                    <img src="https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" alt="main-image" />
                </div>
                <div className={styles['actions']}>
                    <img src={heartRegular} alt="heart-icon" />
                    <p>100 likes</p>
                </div>
                <p className={styles['description']}>
                    It was fun thinking about how this should be viewed from the perspective of a component. It basically takes a window size and increases/decreases the pagination window on each click
                </p>
            </div>
        </>
    );
};