import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';

import styles from '../css/templates/player.module.scss';

import Layout from '../components/Layout';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <section className={styles.Player}>
                <div className={styles.intro}>
                    <Img
                        className={styles.profileImage}
                        fluid={frontmatter.profileImage.childImageSharp.fluid}
                    />
                    <div className={styles.about}>
                        <h1>{frontmatter.fullName}</h1>
                        <p>
                            <b>Known as:</b> {frontmatter.nickName}
                            <br />
                            <b>Joined:</b> {frontmatter.joinedDate}
                            <br />
                            <b>Occupation:</b> {frontmatter.occupation}
                            <br />
                            <b>Role:</b> {frontmatter.role}
                        </p>
                    </div>
                </div>
                <div className={styles.blurb}>
                    <ReactMarkdown
                        source={frontmatter.blurb}
                        escapeHtml={false}
                    />
                </div>
                <hr />
                <div className={styles.stats}>
                    <h2>Poker career</h2>
                    <ul>
                        <li>Career earnings: £{frontmatter.careerEarnings}</li>
                        <li>Seasons played: {frontmatter.seasonsPlayed}</li>
                        <li>Games played: {frontmatter.gamesPlayed}</li>
                        <li>Times cashed: 12 (100%)</li>
                        <li>Times knocked Tommy out: 2</li>
                    </ul>
                </div>
            </section>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            frontmatter {
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
`;
