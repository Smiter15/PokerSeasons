import * as React from 'react';

import styles from '../css/pages/index.module.scss';

import Layout from '../components/Layout';

// markup
const HomePage = () => {
    return (
        <Layout>
            <section className={styles.Home}>
                <h1>Poker Seasons</h1>
                <p>Play poker and stuff</p>
            </section>
        </Layout>
    );
};

export default HomePage;
