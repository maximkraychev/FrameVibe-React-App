import styles from './Header.module.css';
import logoIcon from '../../assets/logo-vector.svg';
import menuIcon from '../../assets/menu-vector.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const [toggleState, setToggleState] = useState(false);


    return(
        <header className={styles['main-header']}>
            <div className={'section-container ' + styles['header-container']}>

                <div className={styles['icon-wrapper']}>
                    <h1 className={styles['logo']}>
                        <Link to="#">
                            <img src={logoIcon} alt="logo" />
                        </Link>
                    </h1>
                    <p className={styles['toggle-menu']} onClick={() => setToggleState(state => !state)}>
                        <img src={menuIcon} alt="menu-toggle" />
                    </p>
                </div>
                
                    <nav className={[styles['main-nav'], toggleState ? styles['active'] : ''].join(' ')}>

                    <p>
                        <Link to="#">Browse</Link>
                    </p>

                    {/* Guest */}
                    <p>
                        <Link to="#">Login</Link>
                    </p>
                    <p>
                        <Link to="#">Register</Link>
                    </p>

                    {/* User */}
                    <p>
                        <Link to="#">Upload Image</Link>
                    </p>
                    <p>
                        <Link to="#">Profile</Link>
                    </p>
                    
                    <p>
                        <Link to="#">Logout</Link>
                    </p>

                    </nav>

            </div>
        </header>
    );
};

export default Header;