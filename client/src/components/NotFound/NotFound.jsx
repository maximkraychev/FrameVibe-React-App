import { Link } from 'react-router-dom';

import { SITE_TITLE } from '../../constants/titles';
import { PATH } from '../../constants/paths';

import styles from './NotFound.module.css';
import { PageTitle } from '../PageTitle/PageTitle';

export const NotFound = () => {
    return (
        <PageTitle title={SITE_TITLE.NOT_FOUND}>

            <div className={styles['not-found-container']}>
                <div className={styles['not-found']}>
                    <div className={styles['not-found-image']}></div>
                    <div className={styles['not-found-description']}>
                        <h2>404</h2>
                        <h5>Oops! Page Not Be Found</h5>
                        <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
                        <Link to={PATH.EXPLORE}>Go Back</Link>
                    </div>
                </div>
            </div>

        </PageTitle>
    )
};