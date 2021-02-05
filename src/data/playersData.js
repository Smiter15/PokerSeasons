import { useStaticQuery, graphql } from 'gatsby';

export const usePlayersData = () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    filter: { fileAbsolutePath: { regex: "/(players)/" } }
                ) {
                    edges {
                        node {
                            frontmatter {
                                id
                                path
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
                }
            }
        `
    );

    return data.allMarkdownRemark.edges;
};
