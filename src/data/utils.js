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

// GAMES

export const getGamePlayers = (players, game) =>
    players.filter((player) => player.games.includes(game));

// PLAYERS

export const getPlayerGames = (games, id) =>
    games.filter((game) => game.results.includes(id));

export const getPlayer = (players, id) =>
    players.filter((player) => player.id === id)[0];

export const mapPlayersForSelect = (players) =>
    players.map((player) => {
        return { value: player.id, label: player.fullName, points: 0 };
    });

// POINTS

export const getPoints = (noPlayers, position) =>
    parseFloat((Math.sqrt(noPlayers / position) * 10).toFixed(2));

// KNOCKOUTS

export const extract = (data, properties) =>
    properties.map((p) => data.map((d) => d[p]));

export const getPlayerKDRatio = (games, id) => {
    const kd = [0, 0]; // kill, death

    games.forEach((game) => {
        const { knockouts } = game;

        knockouts.forEach(([kill, death]) => {
            if (kill === id) kd[0]++;
            if (death === id) kd[1]++;
        });
    });

    return kd;
};

export const getPlayerKnockouts = (games, allPlayers, id) => {
    const knockoutData = [];

    // remove self from players
    const players = allPlayers.filter((player) => player.id !== id);

    players.forEach((player) => {
        let kills = 0;
        let deaths = 0;

        games.forEach((game) => {
            const { knockouts } = game;

            knockouts.forEach((knockout) => {
                if (knockout.includes(player.id)) {
                    const [kill, death] = knockout;

                    if (kill === id) kills++;
                    if (death === id) deaths++;
                }
            });
        });

        // if kills or deaths add to data
        if (kills || deaths) {
            knockoutData.push({
                id: player.id,
                kills,
                deaths
            });
        }
    });

    return knockoutData;
};
