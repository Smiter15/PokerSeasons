import React from 'react';
import { Link } from 'gatsby';

import styles from '../css/pages/seasons.module.scss';

import Layout from '../components/Layout';

import { useSeasonsData } from '../data/seasonsData';

const Seasons = () => {
    const seasons = useSeasonsData();

    const lastSeason = seasons.slice(-1)[0];

    return (
        <Layout>
            <section className={styles.Seasons}>
                <h1>Seasons</h1>
                <p>Seasons will run every 10 weeks. Extra stuff to say</p>
                <div className={styles.active}>
                    <h2>Active season</h2>
                    <Link to={lastSeason.path}>Season {lastSeason.id}</Link>
                </div>
                <hr />
                <h3>All seasons</h3>
                <p>...</p>
                <p>...</p>
                <p>...</p>
            </section>
        </Layout>
    );
};

export default Seasons;
