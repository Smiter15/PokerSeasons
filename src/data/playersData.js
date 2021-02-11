import { useStaticQuery, graphql } from 'gatsby';

import { removeNodeFrontmatter } from './utils';

export const usePlayersData = () => {
    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    filter: { fileAbsolutePath: { regex: "/(players)/" } }
                    sort: {
                        order: DESC
                        fields: frontmatter___currentSeasonPoints
                    }
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

    return removeNodeFrontmatter(data.allMarkdownRemark.edges);
};
