import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import styles from '../../css/pages/games.module.scss';

import Layout from '../../components/Layout';

const Games = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/(games)/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `);

    const gamesData = data.allMarkdownRemark.edges;
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
