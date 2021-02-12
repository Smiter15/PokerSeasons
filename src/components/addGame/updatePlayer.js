import { saveAs } from 'file-saver';

const renderArrayData = (data) =>
    data
        .map((item) => `- ${item}\n`)
        .join('')
        .trim();

export const updatePlayer = (player, gameId, points, prize) => {
    const blob = new Blob([generateMD(player, gameId, points, prize)], {
        type: 'text/plain;charset=utf-8'
    });
    saveAs(
        blob,
        `${player.id}-${player.fullName.replace(/\s+/g, '-').toLowerCase()}.md`
    );
};

const generateGamesList = (player, gameId) => {
    const games = player.games || [gameId];
    return renderArrayData([...games, gameId]);
};

const generateMD = (player, gameId, points, prize) => {
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
    - 1

games:
${generateGamesList(player, gameId)}

careerEarnings: ${(player.careerEarnings + prize).toFixed(2)}
seasonsPlayed: 1
gamesPlayed: ${player.gamesPlayed + 1}
currentSeasonPoints: ${(player.currentSeasonPoints + points).toFixed(2)}
---
`;
};
