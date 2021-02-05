import React from 'react';
import { graphql, Link } from 'gatsby';

import styles from '../css/templates/season.module.scss';

import Layout from '../components/Layout';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <section className={styles.Season}>
                <h1>Season {frontmatter.id}</h1>
                <p>Money in the kitty: {frontmatter.currentKitty}</p>
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
                currentKitty
            }
        }
    }
`;
