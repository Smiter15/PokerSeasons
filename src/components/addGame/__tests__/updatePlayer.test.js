import { generatePlayerMD } from '../updatePlayer';
import { players } from '../../../../__mocks__/data/players';

describe('Update player', () => {
    it('Creates a MD file with updated data when a new game is created', () => {
        // game 4 played between players 1 and 3
        // player 1 wins, knocking out player 3
        // points and payout would be [20, 15]

        const seasonId = 2;
        const gameId = 4;
        const playerOne = players[0];
        const playerThree = players[2];

        const updatedPlayerOneTest = `---
id: 1
path: /players/matt-smithson/
firstName: Matt
lastName: Smithson
fullName: Matt Smithson
nickName: Billy big bollocks
fullNickName: Matt "Billy big bollocks" Smithson
profileImage: ../../images/players/matt-smithson.png
joinedDate: 2021-02-05T14:30:35.701Z
occupation: Buggy website builder
role: Chairman
blurb: >-
    Matt was once sponsored by Plymouth University to represent them amongst 9 other elite players in the National Student Tournament, hosted by Grovesnor casino in Bristol. He did shit. <br /> His biggest tournament win to date is circa $68. <br /> Despite his nick name, he in fact has small bollocks.

seasons:
- 1
- 2

games:
- 1
- 2
- 3
- 4

careerEarnings: 65.00
seasonsPlayed: 2
gamesPlayed: 4
---
`;
        const updatedPlayerThreeTest = `---
id: 3
path: /players/tom-stell/
firstName: Tom
lastName: Stell
fullName: Tom Stell
nickName: The thumber
fullNickName: Tom "The thumber" Stell
profileImage: ../../images/players/tom-stell.png
joinedDate: 2021-02-05T21:11:35.701Z
occupation: Hand model
role: 
blurb: >-
    T-Pain not known for his gambling has developed as an exceptionally lucky poker player over lock down. Cheeky git. <br /> His biggest tournament win to date is circa $18. <br /> Just ask for the picture behind the name.

seasons:
- 1
- 2

games:
- 1
- 2
- 4

careerEarnings: 45.00
seasonsPlayed: 2
gamesPlayed: 3
---
`;

        const updatedPlayerOne = generatePlayerMD(
            playerOne,
            gameId,
            seasonId,
            20,
            20
        );
        const updatedPlayerThree = generatePlayerMD(
            playerThree,
            gameId,
            seasonId,
            15,
            15
        );

        expect(updatedPlayerOne).toBe(updatedPlayerOneTest);
        expect(updatedPlayerThree).toBe(updatedPlayerThreeTest);
    });
});
