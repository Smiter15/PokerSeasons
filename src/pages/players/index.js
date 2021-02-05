import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import styles from '../../css/pages/players.module.scss';

import Layout from '../../components/Layout';

const Players = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/(players)/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                            fullName
                            nickName
                            joinedDate
                            occupation
                            role
                            blurb
                            profileImage {
                                childImageSharp {
                                    fluid(maxWidth: 200, quality: 90) {
                                        ...GatsbyImageSharpFluid_noBase64
                                    }
                                }
                            }
                            careerEarnings
                            seasonsPlayed
                            gamesPlayed
                            currentSeasonPosition
                            currentSeasonPoints
                        }
                    }
                }
            }
        }
    `);

    const playerData = data.allMarkdownRemark.edges;

    return (
        <Layout>
            <section className={styles.Players}>
                <h1>Players</h1>
                <div className={styles.playerList}>
                    {playerData.map((data) => {
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
