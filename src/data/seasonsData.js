import { useStaticQuery, graphql } from 'gatsby';

import { removeNodeFrontmatter } from './utils';

export const useSeasonsData = () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    filter: { fileAbsolutePath: { regex: "/(seasons)/" } }
                    sort: { order: ASC, fields: frontmatter___id }
                ) {
                    edges {
                        node {
                            frontmatter {
                                id
                                path
                                players
                                games
                                kitty
                                active
                            }
                        }
                    }
                }
            }
        `
    );

    return removeNodeFrontmatter(data.allMarkdownRemark.edges);
};
