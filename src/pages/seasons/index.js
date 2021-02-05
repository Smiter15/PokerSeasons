import React from 'react';
import { Link } from 'gatsby';

import styles from '../../css/pages/seasons.module.scss';

import Layout from '../../components/Layout';

import { useGamesData } from '../../data/gamesData';
import { useSeasonsData } from '../../data/seasonsData';
import { usePlayersData } from '../../data/playersData';

const Seasons = () => {
    const gamesData = useGamesData();
    const seasonsData = useSeasonsData();
    const playersData = usePlayersData();

    return (
        <Layout>
            <section className={styles.Seasons}>
                <h1>Seasons</h1>
                <p>Seasons will run every 10 weeks. Extra stuff to say</p>
                <div>
                    <h2>Active season</h2>
                    <Link to={seasonsData[0].node.frontmatter.path}>
                        Season {seasonsData[0].node.frontmatter.id}
                    </Link>
                </div>
                <hr />
                <h3>Previous seasons</h3>
                <p>...</p>
            </section>
        </Layout>
    );
};

export default Seasons;
