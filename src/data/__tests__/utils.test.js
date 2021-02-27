import { nodeFrontmatterData } from '../../../__mocks__/data/nodeFrontmatterData';
import { seasons } from '../../../__mocks__/data/seasons';
import { games } from '../../../__mocks__/data/games';
import { players } from '../../../__mocks__/data/players';

import {
    removeNodeFrontmatter,
    getOrdinal,
    getCurrentSeason,
    getSeasonGames,
    getSeasonPlayers,
    getGamePlayers,
    getPlayerGames,
    getPlayer,
    getPlayerPoints,
    getPlayerGamePosition,
    mapPlayersForSelect,
    calcPoints,
    extract,
    getPlayerKDRatio,
    getPlayerKnockouts
} from '../utils';

describe('Utils', () => {
    it('Returns graphql data with node and frontmatter keys removed', () => {
        const data = [
            {
                id: 1,
                path: '/players/matt-smithson/',
                fullName: 'Matt Smithson'
            },
            {
                id: 4,
                path: '/players/alastair-jarvis/',
                fullName: 'Alastair Jarvis'
            }
        ];

        expect(removeNodeFrontmatter(nodeFrontmatterData)).toEqual(data);
    });

    it('Returns the ordinal for a given position', () => {
        const first = getOrdinal(1);
        const second = getOrdinal(2);
        const third = getOrdinal(3);
        const fourth = getOrdinal(4);

        expect(first).toBe('1st');
        expect(second).toBe('2nd');
        expect(third).toBe('3rd');
        expect(fourth).toBe('4th');
    });

    describe('Seasons', () => {
        it('Returns the current active season data', () => {
            const data = {
                id: 2,
                path: '/seasons/2/',
                players: [1, 2],
                games: [3],
                currentKitty: 25,
                active: true
            };

            expect(getCurrentSeason(seasons)).toEqual(data);
        });

        it('Returns all games within a season', () => {
            const seasonOneGames = [
                {
                    id: 1,
                    path: '/games/1/',
                    season: 1,
                    seasonGame: 1,
                    date: '2021-02-2021T00:00:00.000Z',
                    results: [2, 3, 1],
                    points: [20, 15, 10],
                    knockouts: [[3, 1], [2, 3]],
                    payout: [20, 15, 10],
                    winner: 2
                },
                {
                    id: 2,
                    path: '/games/2/',
                    season: 1,
                    seasonGame: 2,
                    date: '2021-02-17T00:00:00.000Z',
                    results: [1, 3, 2],
                    points: [20, 15, 10],
                    knockouts: [[1, 2], [1, 3]],
                    payout: [20, 15, 10],
                    winner: 1
                }
            ];
            const seasonTwoGames = [
                {
                    id: 3,
                    path: '/games/3/',
                    season: 2,
                    seasonGame: 1,
                    date: '2021-02-24T00:00:00.000Z',
                    results: [2, 1],
                    points: [20, 15],
                    knockouts: [[2, 1]],
                    payout: [20, 15],
                    winner: 2
                }
            ];

            expect(getSeasonGames(games, 1)).toEqual(seasonOneGames);
            expect(getSeasonGames(games, 2)).toEqual(seasonTwoGames);
        });

        it('Returns all players within a season', () => {
            const seasonOnePlayers = players;
            const seasonTwoPlayers = [
                {
                    id: 1,
                    path: '/players/matt-smithson/',
                    firstName: 'Matt',
                    lastName: 'Smithson',
                    fullName: 'Matt Smithson',
                    nickName: 'Billy big bollocks',
                    fullNickName: 'Matt "Billy big bollocks" Smithson',
                    joinedDate: '2021-02-05T14:30:35.701Z',
                    occupation: 'Buggy website builder',
                    role: 'Chairman',
                    blurb:
                        'Matt was once sponsored by Plymouth University to represent them amongst 9 other elite players in the National Student Tournament, hosted by Grovesnor casino in Bristol. He did shit. <br /> His biggest tournament win to date is circa $68. <br /> Despite his nick name, he in fact has small bollocks.',
                    seasons: [1, 2],
                    games: [1, 2, 3],
                    careerEarnings: 45,
                    seasonsPlayed: 2,
                    gamesPlayed: 3
                },
                {
                    id: 2,
                    path: '/players/will-whitell/',
                    firstName: 'Will',
                    lastName: 'Whitell',
                    fullName: 'Will Whitell',
                    nickName: 'Fishing for Tommy',
                    fullNickName: 'Will "Fishing for Tommy" Whitell',
                    joinedDate: '2021-02-05T14:30:35.701Z',
                    occupation: 'Hippy',
                    role: 'Treasurer',
                    blurb:
                        'Will once ate 20 creme eggs for a bet. He did it but the lifetime diabetes after was "probably not worth the 2 quid". <br /> His biggest tournament win to date is circa $25. <br /> He wouldn\'t actually fish, as that goes against his vegan religion.',
                    seasons: [1, 2],
                    games: [1, 2, 3],
                    careerEarnings: 50,
                    seasonsPlayed: 2,
                    gamesPlayed: 3
                }
            ];

            expect(getSeasonPlayers(players, 1)).toEqual(seasonOnePlayers);
            expect(getSeasonPlayers(players, 2)).toEqual(seasonTwoPlayers);
        });
    });

    describe('Games', () => {
        it('Returns playes in a specific game', () => {
            const gameOnePlayers = players;
            const gameTwoPlayers = players;
            const gameThreePlayers = [
                {
                    id: 1,
                    path: '/players/matt-smithson/',
                    firstName: 'Matt',
                    lastName: 'Smithson',
                    fullName: 'Matt Smithson',
                    nickName: 'Billy big bollocks',
                    fullNickName: 'Matt "Billy big bollocks" Smithson',
                    joinedDate: '2021-02-05T14:30:35.701Z',
                    occupation: 'Buggy website builder',
                    role: 'Chairman',
                    blurb:
                        'Matt was once sponsored by Plymouth University to represent them amongst 9 other elite players in the National Student Tournament, hosted by Grovesnor casino in Bristol. He did shit. <br /> His biggest tournament win to date is circa $68. <br /> Despite his nick name, he in fact has small bollocks.',
                    seasons: [1, 2],
                    games: [1, 2, 3],
                    careerEarnings: 45,
                    seasonsPlayed: 2,
                    gamesPlayed: 3
                },
                {
                    id: 2,
                    path: '/players/will-whitell/',
                    firstName: 'Will',
                    lastName: 'Whitell',
                    fullName: 'Will Whitell',
                    nickName: 'Fishing for Tommy',
                    fullNickName: 'Will "Fishing for Tommy" Whitell',
                    joinedDate: '2021-02-05T14:30:35.701Z',
                    occupation: 'Hippy',
                    role: 'Treasurer',
                    blurb:
                        'Will once ate 20 creme eggs for a bet. He did it but the lifetime diabetes after was "probably not worth the 2 quid". <br /> His biggest tournament win to date is circa $25. <br /> He wouldn\'t actually fish, as that goes against his vegan religion.',
                    seasons: [1, 2],
                    games: [1, 2, 3],
                    careerEarnings: 50,
                    seasonsPlayed: 2,
                    gamesPlayed: 3
                }
            ];

            expect(getGamePlayers(players, 1)).toEqual(gameOnePlayers);
            expect(getGamePlayers(players, 2)).toEqual(gameTwoPlayers);
            expect(getGamePlayers(players, 3)).toEqual(gameThreePlayers);
        });
    });

    describe('Players', () => {
        it('Returns specific player', () => {
            const player = {
                id: 1,
                path: '/players/matt-smithson/',
                firstName: 'Matt',
                lastName: 'Smithson',
                fullName: 'Matt Smithson',
                nickName: 'Billy big bollocks',
                fullNickName: 'Matt "Billy big bollocks" Smithson',
                joinedDate: '2021-02-05T14:30:35.701Z',
                occupation: 'Buggy website builder',
                role: 'Chairman',
                blurb:
                    'Matt was once sponsored by Plymouth University to represent them amongst 9 other elite players in the National Student Tournament, hosted by Grovesnor casino in Bristol. He did shit. <br /> His biggest tournament win to date is circa $68. <br /> Despite his nick name, he in fact has small bollocks.',
                seasons: [1, 2],
                games: [1, 2, 3],
                careerEarnings: 45,
                seasonsPlayed: 2,
                gamesPlayed: 3
            };

            expect(getPlayer(players, 1)).toEqual(player);
        });

        it('Returns the points scored in a game for the specifc player', () => {
            const [playerOne, playerTwo, playerThree] = players;
            const [gameOne, gameTwo, gameThree] = games;

            expect(getPlayerPoints(gameOne, playerOne)).toBe(10);
            expect(getPlayerPoints(gameOne, playerTwo)).toBe(20);
            expect(getPlayerPoints(gameOne, playerThree)).toBe(15);

            expect(getPlayerPoints(gameTwo, playerOne)).toBe(20);
            expect(getPlayerPoints(gameTwo, playerTwo)).toBe(10);
            expect(getPlayerPoints(gameTwo, playerThree)).toBe(15);

            expect(getPlayerPoints(gameThree, playerOne)).toBe(15);
            expect(getPlayerPoints(gameThree, playerTwo)).toBe(20);
        });

        it('Returns position for player in specific game', () => {
            const [playerOne, playerTwo, playerThree] = players;
            const [gameOne, gameTwo, gameThree] = games;

            expect(getPlayerGamePosition(gameOne, playerOne)).toBe('3rd');
            expect(getPlayerGamePosition(gameOne, playerTwo)).toBe('1st');
            expect(getPlayerGamePosition(gameOne, playerThree)).toBe('2nd');

            expect(getPlayerGamePosition(gameTwo, playerOne)).toBe('1st');
            expect(getPlayerGamePosition(gameTwo, playerTwo)).toBe('3rd');
            expect(getPlayerGamePosition(gameTwo, playerThree)).toBe('2nd');

            expect(getPlayerGamePosition(gameThree, playerOne)).toBe('2nd');
            expect(getPlayerGamePosition(gameThree, playerTwo)).toBe('1st');
        });

        it('Returns all games the player has played in', () => {
            const playerOneGames = games;
            const playerTwoGames = games;
            const playerThreeGames = [
                {
                    id: 1,
                    path: '/games/1/',
                    season: 1,
                    seasonGame: 1,
                    date: '2021-02-2021T00:00:00.000Z',
                    results: [2, 3, 1],
                    points: [20, 15, 10],
                    knockouts: [[3, 1], [2, 3]],
                    payout: [20, 15, 10],
                    winner: 2
                },
                {
                    id: 2,
                    path: '/games/2/',
                    season: 1,
                    seasonGame: 2,
                    date: '2021-02-17T00:00:00.000Z',
                    results: [1, 3, 2],
                    points: [20, 15, 10],
                    knockouts: [[1, 2], [1, 3]],
                    payout: [20, 15, 10],
                    winner: 1
                }
            ];

            expect(getPlayerGames(games, 1)).toEqual(playerOneGames);
            expect(getPlayerGames(games, 2)).toEqual(playerTwoGames);
            expect(getPlayerGames(games, 3)).toEqual(playerThreeGames);
        });

        it('Should create array of players suitable for ReactSelect component', () => {
            const selectPlayers = [
                { value: 1, label: 'Matt Smithson', points: 0 },
                { value: 2, label: 'Will Whitell', points: 0 },
                { value: 3, label: 'Tom Stell', points: 0 }
            ];

            expect(mapPlayersForSelect(players)).toEqual(selectPlayers);
        });
    });

    describe('Points', () => {
        it('Returns the amount of points for position placed relative to players in game', () => {
            expect(calcPoints(7, 1)).toBe(26.46);
            expect(calcPoints(7, 2)).toBe(18.71);
            expect(calcPoints(7, 3)).toBe(15.28);
            expect(calcPoints(7, 4)).toBe(13.23);
            expect(calcPoints(7, 5)).toBe(11.83);
            expect(calcPoints(7, 6)).toBe(10.8);
            expect(calcPoints(7, 7)).toBe(10);
        });

        it('Always return 10 points for last position', () => {
            expect(calcPoints(1, 1)).toBe(10);
            expect(calcPoints(10, 10)).toBe(10);
            expect(calcPoints(100, 100)).toBe(10);
        });
    });

    describe('Knockouts', () => {
        it('Returns an array of arrays for each property in the dataset', () => {
            const data = [
                {
                    prop1: 1,
                    prop2: 2
                },
                {
                    prop1: 10,
                    prop2: 20
                }
            ];
            const properties = ['prop1', 'prop2'];
            const extracted = [[1, 10], [2, 20]];

            expect(extract(data, properties)).toEqual(extracted);
        });

        it('Returns total kills and deaths for a specific player', () => {
            expect(getPlayerKDRatio(games, 1)).toEqual([2, 2]);
            expect(getPlayerKDRatio(games, 2)).toEqual([2, 1]);
            expect(getPlayerKDRatio(games, 3)).toEqual([1, 2]);
        });

        it('Returns kills and deaths for each player the specific player has either killed or died to', () => {
            const playerOneKnockouts = [
                {
                    id: 2,
                    kills: 1,
                    deaths: 1
                },
                {
                    id: 3,
                    kills: 1,
                    deaths: 1
                }
            ];
            const playerTwoKnockouts = [
                {
                    id: 1,
                    kills: 1,
                    deaths: 1
                },
                {
                    id: 3,
                    kills: 1,
                    deaths: 0
                }
            ];
            const playerThreeKnockouts = [
                {
                    id: 1,
                    kills: 1,
                    deaths: 1
                },
                {
                    id: 2,
                    kills: 0,
                    deaths: 1
                }
            ];

            expect(getPlayerKnockouts(games, players, 1)).toEqual(
                playerOneKnockouts
            );
            expect(getPlayerKnockouts(games, players, 2)).toEqual(
                playerTwoKnockouts
            );
            expect(getPlayerKnockouts(games, players, 3)).toEqual(
                playerThreeKnockouts
            );
        });
    });
});
