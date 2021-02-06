export const getSeasonGames = (games, season) =>
    games.filter((game) => game.node.frontmatter.season === season);

export const getSeasonPlayers = (players, season) =>
    players.filter((player) =>
        player.node.frontmatter.seasons.includes(season)
    );

// export const getGamePlayers = (players, game) =>
//     players.filter((player) => player.season === game);

// export const getPlayerSeasons = (seasons, player) =>
//     seasons.filter((season) => season.id === player);
