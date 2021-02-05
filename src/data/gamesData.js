import { useStaticQuery, graphql } from 'gatsby';

export const useGamesData = () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    filter: { fileAbsolutePath: { regex: "/(games)/" } }
                ) {
                    edges {
                        node {
                            frontmatter {
                                id
                                path
                            }
                        }
                    }
                }
            }
        `
    );

    return data.allMarkdownRemark.edges;
};
