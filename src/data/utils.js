// UTILS

export const removeNodeFrontmatter = (data) =>
    data.map((item) => item.node.frontmatter);

// SEASONS

export const getSeasonGames = (games, season) =>
    games.filter((game) => game.season === season);

export const getSeasonPlayers = (players, season) =>
    players.filter((player) => player.seasons.includes(season));

// PLAYERS

export const getGamePlayers = (players, game) =>
    players.filter((player) => player.games.includes(game));

export const getPlayer = (players, id) =>
    players.filter((player) => player.id === id)[0];
