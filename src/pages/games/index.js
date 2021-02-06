import React from 'react';
import { Link } from 'gatsby';

import styles from '../../css/pages/games.module.scss';

import Layout from '../../components/Layout';

import { useGamesData } from '../../data/gamesData';

const Games = () => {
    const gamesData = useGamesData();

    const game1 = gamesData[0].node.frontmatter;
    const game2 = gamesData[1].node.frontmatter;

    return (
        <Layout>
            <section className={styles.Games}>
                <h1>Games</h1>
                <p>Game was played on x date</p>
                <div className={styles.active}>
                    <h2>Last game</h2>
                    <Link to={game2.path}>Game 2</Link>
                </div>
                <hr />
                <h3>Previous games</h3>
                <p>
                    <Link to={game1.path}>Game 1</Link>
                </p>
                <p>...</p>
                <p>...</p>
            </section>
        </Layout>
    );
};

export default Games;
