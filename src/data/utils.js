// UTILS

export const removeNodeFrontmatter = (data) =>
    data.map((item) => item.node.frontmatter);

export const getOrdinal = (n) =>
    `${n}${['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'}`;

// SEASONS

export const getCurrentSeason = (seasons) =>
    seasons.find((season) => season.active === true);

export const getSeasonGames = (games, seasonId) =>
    games.filter((game) => game.season === seasonId);

export const getSeasonPlayers = (players, seasonId) =>
    players.filter((player) => player.seasons.includes(seasonId));

// GAMES

export const getGamePlayers = (players, gameId) =>
    players.filter((player) => player.games.includes(gameId));

// PLAYERS

export const getPlayer = (players, playerId) =>
    players.find((player) => player.id === playerId);

export const getPlayerPoints = (game, player) => {
    const playerResult = game.results.find((result) => result === player.id);
    const playerResultIndex = game.results.indexOf(playerResult);

    return game.points[playerResultIndex];
};

export const getPlayerGamePosition = (game, player) => {
    const playerResult = game.results.find((result) => result === player.id);

    return getOrdinal(game.results.indexOf(playerResult) + 1);
};

export const getPlayerGames = (games, playerId) =>
    games.filter((game) => game.results.includes(playerId));

export const getPlayerBubbles = (games, playerId) => {
    let bubbleCount = 0;
    games.forEach((game) => {
        if (game.results[game.payout.length] === playerId) bubbleCount++;
    });
    return bubbleCount;
};

export const mapPlayersForSelect = (players) =>
    players.map((player) => ({
        value: player.id,
        label: player.fullName,
        points: 0
    }));

// POINTS

export const calcPoints = (noPlayers, position) =>
    parseFloat((Math.sqrt(noPlayers / position) * 5).toFixed(2));

// KNOCKOUTS

export const extract = (data, properties) =>
    properties.map((p) => data.map((d) => d[p]));

export const getPlayerKDRatio = (games, playerId) => {
    const kd = [0, 0]; // kill, death

    games.forEach((game) => {
        const { knockouts } = game;

        knockouts.forEach(([kill, death]) => {
            if (kill === playerId) kd[0]++;
            if (death === playerId) kd[1]++;
        });
    });

    const [k, d] = kd;
    return d === 0 ? k.toFixed(2) : (k / d).toFixed(2);
};

export const getSeasonKnockouts = (games, players) => {
    const knockoutData = players.map((player) => {
        return { playerId: player.id, kills: 0, deaths: 0 };
    });

    games.forEach((game) => {
        const { knockouts } = game;

        knockouts.forEach(([kill, death]) => {
            knockoutData.forEach((player, i) => {
                if (kill === player.playerId) knockoutData[i].kills++;
                if (death === player.playerId) knockoutData[i].deaths++;
            });
        });
    });

    return knockoutData;
};

export const getGameKnockouts = (knockouts, players) => {
    const knockoutData = players.map((player) => {
        return { playerId: player.id, kills: 0, deaths: 0 };
    });

    knockouts.forEach(([kill, death]) => {
        knockoutData.forEach((player, i) => {
            if (kill === player.playerId) knockoutData[i].kills++;
            if (death === player.playerId) knockoutData[i].deaths++;
        });
    });

    return knockoutData;
};

export const getPlayerKnockouts = (games, allPlayers, playerId) => {
    const knockoutData = [];

    // remove self from players
    const players = allPlayers.filter((player) => player.id !== playerId);

    players.forEach((player) => {
        let kills = 0;
        let deaths = 0;

        games.forEach((game) => {
            const { knockouts } = game;

            knockouts.forEach((knockout) => {
                if (knockout.includes(player.id)) {
                    const [kill, death] = knockout;

                    if (kill === playerId) kills++;
                    if (death === playerId) deaths++;
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
