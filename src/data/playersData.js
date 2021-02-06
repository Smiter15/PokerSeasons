import { useStaticQuery, graphql } from 'gatsby';

export const usePlayersData = () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    filter: { fileAbsolutePath: { regex: "/(players)/" } }
                    sort: { order: ASC, fields: frontmatter___id }
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
                                seasons
                                games
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
