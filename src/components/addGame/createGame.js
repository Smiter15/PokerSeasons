import { calcPoints } from '../../data/utils';

const renderArrayData = (data) =>
    data
        .map((item) => `- ${item}\n`)
        .join('')
        .trim();

const renderNestedArrayData = (data) =>
    data
        .map((item) => `- [${item}]\n`)
        .join('')
        .trim();

export const createGame = (
    gameId,
    seasonId,
    seasonGameCount,
    results,
    datePlayed,
    payout,
    knockouts
) => {
    const points = results.map((_, i) => calcPoints(results.length, i + 1));

    return `---
id: ${gameId}
path: /games/${gameId}/
season: ${seasonId}
seasonGame: ${seasonGameCount}
date: ${datePlayed}

# player ids in order of results
results:
${renderArrayData(results.map((r) => r.value))}
# points for each position
points:
${renderArrayData(points)}
# player id on the left knocked out the player id on the right
knockouts:
${renderNestedArrayData(knockouts)}
# data
payout:
${renderArrayData(payout)}
# player id
winner: ${results[0].value}
---`;
};
