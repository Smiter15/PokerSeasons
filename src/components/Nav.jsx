import React from 'react';
import { Link } from 'gatsby';

import styles from '../css/nav.module.scss';

const Nav = () => {
    return (
        <section className={styles.Nav}>
            {/* logo */}
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/seasons/'>Seasons</Link>
                <Link to='/games/'>Games</Link>
                <Link to='/players/'>Players</Link>
            </nav>
        </section>
    );
};

export default Nav;
