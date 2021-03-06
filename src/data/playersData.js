import { useStaticQuery, graphql } from 'gatsby';

import { removeNodeFrontmatter } from './utils';

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
                                firstName
                                lastName
                                fullName
                                nickName
                                fullNickName
                                profileImage {
                                    childImageSharp {
                                        fluid(maxWidth: 200, quality: 90) {
                                            ...GatsbyImageSharpFluid_noBase64
                                        }
                                    }
                                }
                                joinedDate
                                occupation
                                role
                                blurb
                                seasons
                                games
                                careerEarnings
                                seasonsPlayed
                                gamesPlayed
                            }
                        }
                    }
                }
            }
        `
    );

    return removeNodeFrontmatter(data.allMarkdownRemark.edges);
};
