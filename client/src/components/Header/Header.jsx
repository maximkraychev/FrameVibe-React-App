import styles from './Header.module.css';
import logoIcon from '../../assets/logo-vector.svg';
import menuIcon from '../../assets/menu-vector.svg';
import { useState } from 'react';

const Header = () => {

    const [toggleState, setToggleState] = useState(false);


    return(
        <header className={styles['main-header']}>
            <div className={'section-container ' + styles['header-container']}>

                <div className={styles['icon-wrapper']}>
                    <h1 className={styles['logo']}>
                        <a href="#">
                            <img src={logoIcon} alt="logo" />
                        </a>
                    </h1>
                    <p className={styles['toggle-menu']} onClick={() => setToggleState(state => !state)}>
                        <img src={menuIcon} alt="menu-toggle" />
                    </p>
                </div>
                
                    <nav className={[styles['main-nav'], toggleState ? styles['active'] : ''].join(' ')}>

                    <p>
                        <a href="#">Browse</a>
                    </p>

                    {/* Guest */}
                    <p>
                        <a href="#">Login</a>
                    </p>
                    <p>
                        <a href="#">Register</a>
                    </p>

                    {/* User */}
                    <p>
                        <a href="#">Upload Image</a>
                    </p>
                    <p>
                        <a href="#">Profile</a>
                    </p>
                    
                    <p>
                        <a href="#">Logout</a>
                    </p>

                    </nav>

            </div>
        </header>
    );
};

export default Header;