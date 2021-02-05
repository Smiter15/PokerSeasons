import React from 'react';
import { Link } from 'gatsby';

import styles from '../../css/pages/games.module.scss';

import Layout from '../../components/Layout';

import { useGamesData } from '../../data/gamesData';

const Games = () => {
    const gamesData = useGamesData();
    const game = gamesData[0].node.frontmatter;

    return (
        <Layout>
            <section className={styles.Games}>
                <h1>Games</h1>
                <p>Game was played on x date</p>
                <div>
                    <h2>Last game's result</h2>
                    <p>Matt won</p>
                    <p>
                        See more <Link to={game.path}>here</Link>
                    </p>
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
