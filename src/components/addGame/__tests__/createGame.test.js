import { createGame } from '../createGame';

describe('Create game data', () => {
	it('Creates a MD file with passed in game data', () => {
		const newGametest = `---
id: 4
path: /games/4/
season: 2
seasonGame: 2
date: 2021-03-03T00:00:00.000Z

# player ids in order of results
results:
- 1
- 2
- 3
# points for each position
points:
- 10.61
- 7.5
- 6.12
# player id on the left knocked out the player id on the right
knockouts:
- [1,3]
- [1,2]
# data
payout:
- 20
- 15
- 10
# player id
winner: 1
---`;

		const results = [
			{
				value: 1,
				label: 'Matt Smithson',
				points: 0,
			},
			{
				value: 2,
				label: 'Will Whitell',
				points: 0,
			},
			{
				value: 3,
				label: 'Tom Stell',
				points: 0,
			},
		];

		const newGame = createGame(
			4,
			2,
			2,
			results,
			'2021-03-03T00:00:00.000Z',
			[20, 15, 10],
			[
				[1, 3],
				[1, 2],
			]
		);

		expect(newGame).toBe(newGametest);
	});
});
