import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import styles from '../../css/pages/players.module.scss';

import Layout from '../../components/Layout';

import { usePlayersData } from '../../data/playersData';

const Players = () => {
    const playersData = usePlayersData();

    return (
        <Layout>
            <section className={styles.Players}>
                <h1>Players</h1>
                <div className={styles.playerList}>
                    {playersData.map((data) => {
                        const player = data.node.frontmatter;

                        return (
                            <Link
                                to={player.path}
                                key={player.nickName}
                                className={styles.player}
                            >
                                <Img
                                    className={styles.profileImage}
                                    fluid={
                                        player.profileImage.childImageSharp
                                            .fluid
                                    }
                                />
                                <p>{player.fullName}</p>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
};

export default Players;
