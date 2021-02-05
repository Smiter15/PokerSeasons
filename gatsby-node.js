const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const playerTemplate = path.resolve('src/templates/player.js');
    const playerData = await graphql(`
        {
            allMarkdownRemark(
                limit: 1000
                filter: { fileAbsolutePath: { regex: "/(players)/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `);

    // Handle errors
    if (playerData.errors) {
        reporter.panicOnBuild(
            `Error while running GraphQL query for blog posts.`
        );
        return;
    }

    playerData.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.path,
            component: playerTemplate,
            context: {} // additional data can be passed via context
        });
    });

    ////////////////////////////////////////////////////////////////////////////////////////

    const seasonTemplate = path.resolve('src/templates/season.js');
    const seasonData = await graphql(`
        {
            allMarkdownRemark(
                limit: 1000
                filter: { fileAbsolutePath: { regex: "/(seasons)/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `);

    // Handle errors
    if (seasonData.errors) {
        reporter.panicOnBuild(
            `Error while running GraphQL query for blog posts.`
        );
        return;
    }

    seasonData.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.path,
            component: seasonTemplate,
            context: {} // additional data can be passed via context
        });
    });

    ////////////////////////////////////////////////////////////////////////////////////////

    const gameTemplate = path.resolve('src/templates/game.js');
    const gameData = await graphql(`
        {
            allMarkdownRemark(
                limit: 1000
                filter: { fileAbsolutePath: { regex: "/(games)/" } }
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `);

    // Handle errors
    if (gameData.errors) {
        reporter.panicOnBuild(
            `Error while running GraphQL query for blog posts.`
        );
        return;
    }

    gameData.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.path,
            component: gameTemplate,
            context: {} // additional data can be passed via context
        });
    });
};
