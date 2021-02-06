// UTILS

export const removeNodeFrontmatter = (data) =>
    data.map((item) => item.node.frontmatter);

// SEASONS

export const getSeasonGames = (games, season) =>
    removeNodeFrontmatter(
        games.filter((game) => game.node.frontmatter.season === season)
    );

export const getSeasonPlayers = (players, season) =>
    removeNodeFrontmatter(
        players.filter((player) =>
            player.node.frontmatter.seasons.includes(season)
        )
    );

// PLAYERS

export const getGamePlayers = (players, game) =>
    removeNodeFrontmatter(
        players.filter((player) => player.node.frontmatter.games.includes(game))
    );

export const getPlayer = (players, id) =>
    players.filter((player) => player.id === id)[0];
