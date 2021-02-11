import React from 'react';
import { Link } from 'gatsby';

import styles from '../css/pages/games.module.scss';

import Layout from '../components/Layout';

import { useGamesData } from '../data/gamesData';

const Games = () => {
    const games = useGamesData();

    const lastGame = games.slice(-1)[0];

    return (
        <Layout>
            <section className={styles.Games}>
                <h1>Games</h1>
                <p>Game was played on 10th Feb</p>
                <div className={styles.active}>
                    <h2>Last game</h2>
                    <Link to={lastGame.path}>Game {lastGame.id}</Link>
                </div>
                <hr />
                <h3>Previous games</h3>
                <p>...</p>
                <p>...</p>
                <p>...</p>
            </section>
        </Layout>
    );
};

export default Games;