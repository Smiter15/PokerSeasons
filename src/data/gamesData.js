import { useStaticQuery, graphql } from 'gatsby';

import { removeNodeFrontmatter } from './utils';

export const useGamesData = () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    filter: { fileAbsolutePath: { regex: "/(games)/" } }
                    sort: { order: ASC, fields: frontmatter___id }
                ) {
                    edges {
                        node {
                            frontmatter {
                                id
                                path
                                season
                                seasonGame
                                date
                                results
                                points
                                knockouts
                                payout
                                winner
                            }
                        }
                    }
                }
            }
        `
    );

    return removeNodeFrontmatter(data.allMarkdownRemark.edges);
};
