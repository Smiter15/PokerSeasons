import React from 'react';
import { Link } from 'gatsby';

import styles from '../css/pages/seasons.module.scss';

import Layout from '../components/Layout';

import { getCurrentSeason } from '../data/utils';

import { useSeasonsData } from '../data/seasonsData';

const Seasons = () => {
    const seasons = useSeasonsData();

    const activeSeason = getCurrentSeason(seasons);

    return (
        <Layout>
            <section className={styles.Seasons}>
                <h1>Seasons</h1>
                <p>Seasons will run every 10 weeks. Extra stuff to say</p>
                <div className={styles.active}>
                    <h2>Active season</h2>
                    <Link to={activeSeason.path}>Season {activeSeason.id}</Link>
                </div>
                <hr />
                <h3>All seasons</h3>
                <p>
                    <Link to='/seasons/1/'>Season 1</Link>
                </p>
            </section>
        </Layout>
    );
};

export default Seasons;
