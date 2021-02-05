import React from 'react';
import { graphql, Link } from 'gatsby';

import styles from '../css/templates/game.module.scss';

import Layout from '../components/Layout';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <section className={styles.Game}>
                <h1>Game {frontmatter.id}</h1>
                <p>Prize pool: {frontmatter.kitty}</p>
                <hr />
                <div className={styles.stats}>
                    <h2>Standings</h2>
                    {frontmatter.players.map((player, i) => {
                        return (
                            <Link key={`${player}-${i}`}>
                                <p>
                                    {i + 1} - {player}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            frontmatter {
                id
                players
                kitty
            }
        }
    }
`;
