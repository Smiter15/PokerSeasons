const PrizeRenderer = (column) => {
    const result = column.data.results.filter(
        (result) => result === column.playerId
    )[0];
    const resultIndex = column.data.results.indexOf(result);
    const prize = column.data.payout[resultIndex]
        ? `£${column.data.payout[resultIndex].toFixed(2)}`
        : '£0.00';

    return prize;
};

export default PrizeRenderer;
