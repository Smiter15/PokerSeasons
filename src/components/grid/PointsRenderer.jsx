const PointsRenderer = (column) => {
    const playerId = column.data.id;
    const game = column.game;
    const playerResult = game.results.filter(
        (result) => result === playerId
    )[0];
    const playerResultIndex = game.results.indexOf(playerResult);
    const points = game.points[playerResultIndex];

    return points;
};

export default PointsRenderer;
