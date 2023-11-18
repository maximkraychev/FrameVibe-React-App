import styles from './Profile.module.css';
import { PreviewPost } from './PreviewPost/PreviewPost';
import { Link, Outlet } from 'react-router-dom';

export const Profile = () => {

    const urlAfterDetailsClose = '/profile';

    return (
        <section className={styles['profile-section']}>
            <Outlet context={[urlAfterDetailsClose]}></Outlet>
            <header>
                <div className={styles['profile-picture-container']}>
                    <img src="https://images.unsplash.com/photo-1698778755079-a76db5955d2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D" alt="avatar" />
                </div>
                <div className={styles['profile-details']}>
                    <p>username-goes-here</p>
                    <button className={styles['profile-edit-btn']}>Edit profile</button>
                </div>
            </header>

            <div className={styles['user-posts']}>
                <Link to={'asd23'}>
                    <PreviewPost />
                </Link>
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
                <PreviewPost />
            </div>
        </section>
    );
};