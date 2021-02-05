import { useStaticQuery, graphql } from 'gatsby';

export const useSeasonsData = () => {
    const data = useStaticQuery(
        graphql`
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
        `
    );

    return data.allMarkdownRemark.edges;
};
