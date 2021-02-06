import { useStaticQuery, graphql } from 'gatsby';

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
                                players
                                results
                                winner
                                kitty
                                complete
                            }
                        }
                    }
                }
            }
        `
    );

    return data.allMarkdownRemark.edges;
};
