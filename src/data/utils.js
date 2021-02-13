// UTILS

export const removeNodeFrontmatter = (data) =>
    data.map((item) => item.node.frontmatter);

export const getOrdinal = (n) =>
    `${n}${['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'}`;

// SEASONS

export const getCurrentSeason = (seasons) =>
    seasons.filter((season) => season.active === true)[0];

export const getSeasonGames = (games, season) =>
    games.filter((game) => game.season === season);

export const getSeasonPlayers = (players, season) =>
    players.filter((player) => player.seasons.includes(season));

// PLAYERS

export const getGamePlayers = (players, game) =>
    players.filter((player) => player.games.includes(game));

export const getPlayer = (players, id) =>
    players.filter((player) => player.id === id)[0];

export const mapPlayersForSelect = (players) =>
    players.map((player) => {
        return { value: player.id, label: player.fullName, points: 0 };
    });

// GAMES

export const getPlayerGames = (games, id) =>
    games.filter((game) => game.results.includes(id));

// POINTS

export const getPoints = (noPlayers, position) =>
    parseFloat((Math.sqrt(noPlayers / position) * 10).toFixed(2));
