import { saveAs } from 'file-saver';

const renderArrayData = (data) =>
    data
        .map((item) => `- ${item}\n`)
        .join('')
        .trim();

const generateGamesList = (season, gameId) => {
    const games = season.games || [gameId];
    return renderArrayData([...games, gameId]);
};

const addToKitty = (season, noPlayers) => {
    const contribution = noPlayers * 5 * 0.4;
    return (season.currentKitty + contribution).toFixed(2);
};

export const updateSeason = (season, gameId, noPlayers) => {
    const blob = new Blob([generateSeasonMD(season, gameId)], {
        type: 'text/plain;charset=utf-8'
    });
    saveAs(blob, `${season.id}-season.md`);
};

export const generateSeasonMD = (season, gameId, noPlayers) => {
    return `---
id: ${season.id}
path: /seasons/${season.id}/

players:
${renderArrayData(season.players)}

games:
${generateGamesList(season, gameId)}

currentKitty: ${addToKitty(season, noPlayers)}
active: ${season.active}
---`;
};
