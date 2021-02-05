import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';

import styles from '../../css/pages/seasons.module.scss';

import Layout from '../../components/Layout';

const Seasons = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/(seasons)/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            id
                            path
                            players
                            currentKitty
                        }
                    }
                }
            }
        }
    `);

    const seasonsData = data.allMarkdownRemark.edges;
    const activeSeason = seasonsData[0].node.frontmatter;

    return (
        <Layout>
            <section className={styles.Seasons}>
                <h1>Seasons</h1>
                <p>Seasons will run every 10 weeks. Extra stuff to say</p>
                <div>
                    <h2>Active season</h2>
                    <Link to={activeSeason.path}>Season {activeSeason.id}</Link>
                </div>
                <hr />
                <h3>Previous seasons</h3>
                <p>...</p>
            </section>
        </Layout>
    );
};

export default Seasons;
