import { saveAs } from 'file-saver';

const renderArrayData = (data) =>
    data
        .map((item) => `- ${item}\n`)
        .join('')
        .trim();

export const updatePlayer = (player, gameId, seasonId, points, prize) => {
    const blob = new Blob(
        [generatePlayerMD(player, gameId, seasonId, points, prize)],
        {
            type: 'text/plain;charset=utf-8'
        }
    );
    saveAs(
        blob,
        `${player.id}-${player.fullName.replace(/\s+/g, '-').toLowerCase()}.md`
    );
};

const generateSeasonsList = (player, seasonId) => {
    if (player.seasons.indexOf(seasonId) === -1) player.seasons.push(seasonId);
    return renderArrayData(player.seasons);
};

const generateGamesList = (player, gameId) => {
    const games = player.games || [gameId];
    return renderArrayData([...games, gameId]);
};

export const generatePlayerMD = (player, gameId, seasonId, points, prize) => {
    return `---
id: ${player.id}
path: /players/${player.fullName.replace(/\s+/g, '-').toLowerCase()}/
firstName: ${player.firstName}
lastName: ${player.lastName}
fullName: ${player.fullName}
nickName: ${player.nickName}
fullNickName: ${player.fullNickName}
profileImage: ../../images/players/${player.fullName
        .replace(/\s+/g, '-')
        .toLowerCase()}.png
joinedDate: ${player.joinedDate}
occupation: ${player.occupation}
role: ${player.role || ''}
blurb: >-
    ${player.blurb}

seasons:
${generateSeasonsList(player, seasonId)}

games:
${generateGamesList(player, gameId)}

careerEarnings: ${(player.careerEarnings + prize).toFixed(2)}
seasonsPlayed: ${player.seasons.length}
gamesPlayed: ${player.gamesPlayed + 1}
---
`;
};
