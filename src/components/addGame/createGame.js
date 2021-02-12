import { getPoints } from '../../data/utils';

const renderArrayData = (data) =>
    data
        .map((item) => `- ${item}\n`)
        .join('')
        .trim();

export const createGame = (
    gameId,
    seasonId,
    seasonGameCount,
    players,
    payout
) => {
    const points = players.map((_, i) => getPoints(players.length, i + 1));

    return `---
id: ${gameId}
path: /games/${gameId}/
season: ${seasonId}
seasonGame: ${seasonGameCount}
date: ${new Date()}

# player ids in order of results
results:
${renderArrayData(players.map((p) => p.value))}
# points for each position
points:
${renderArrayData(points)}
# TODO DYNAMIC
payout:
${renderArrayData(payout)}
# player id
winner: ${players[0].value}
---
`;
};
