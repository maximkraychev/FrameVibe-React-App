import { Link } from 'react-router-dom';
import { HeartSvg } from '../../Svg/Heart';
import styles from './PostCard.module.css';

export const PostCard = () => {
    return (
        <>
            <div className={styles['card']}>
                <header>
                    <div className={styles['avatar-container']}>
                        <Link to={'someId'}>
                            <img src="https://images.unsplash.com/photo-1698778755079-a76db5955d2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="avatar" />
                        </Link>
                    </div>
                    <p className={styles['username']}>Test</p>
                    <button>View Profile</button>
                </header>
                <div className={styles['image-container']}>
                    <img src="https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" alt="main-image" />
                </div>
                <div className={styles['actions']}>
                    <HeartSvg />
                    <p>100 likes</p>
                </div>
                <p className={styles['description']}>
                    It was fun thinking about how this should be viewed from the perspective of a component. It basically takes a window size and increases/decreases the pagination window on each click
                </p>
            </div>


            <div className={styles['card']}>
                <header>
                    <div className={styles['avatar-container']}>
                        <Link to={'someId'}>
                            <img src="https://images.unsplash.com/photo-1698668768739-7dfa1a00a8f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="avatar" />
                        </Link>
                    </div>
                    <p className={styles['username']}>Test</p>
                    <button>View Profile</button>
                </header>
                <div className={styles['image-container']}>
                    <img src="https://images.unsplash.com/photo-1698778756005-e72f3303f78b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="main-image" />
                </div>
                <div className={styles['actions']}>
                    <HeartSvg />
                    <p>100 likes</p>
                </div>
                <p className={styles['description']}>
                    It was fun thinking about how this should be viewed from the perspective of a component. It basically takes a window size and increases/decreases the pagination window on each click
                </p>
            </div>

            <div className={styles['card']}>
                <header>
                    <div className={styles['avatar-container']}>
                        <Link to={'someId'}>
                            <img src="https://images.unsplash.com/photo-1698681375999-8faa3e824cd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="avatar" />
                        </Link>
                    </div>
                    <p className={styles['username']}>Test</p>
                    <button>View Profile</button>
                </header>
                <div className={styles['image-container']}>
                    <Link to={'/explore/ioashd'}>
                        <img src="https://images.unsplash.com/photo-1698778755357-63abc1fe986f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="main-image" />
                    </Link>
                </div>
                <div className={styles['actions']}>
                    <HeartSvg />
                    <p>100 likes</p>
                </div>
                <p className={styles['description']}>
                    It was fun thinking about how this should be viewed from the perspective of a component. It basically takes a window size and increases/decreases the pagination window on each click
                </p>
            </div>
        </>
    );
};