import { useStaticQuery, graphql } from 'gatsby';

export const useSnapshotData = () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    filter: { fileAbsolutePath: { regex: "/(snapshots)/" } }
                    sort: { order: ASC, fields: frontmatter___id }
                ) {
                    edges {
                        node {
                            frontmatter {
                                id
                                game
                                season
                                results
                                scores
                            }
                        }
                    }
                }
            }
        `
    );

    return data.allMarkdownRemark.edges;
};
