import { removeNodeFrontmatter, getOrdinal, getCurrentSeason } from '../utils';

import { nodeFrontmatterData } from '../../../__mocks__/data/nodeFrontmatterData';
import { seasons } from '../../../__mocks__/data/seasons';

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

        expect(removeNodeFrontmatter(nodeFrontmatterData)).toStrictEqual(data);
    });

    it('Returns correct values for ordinals', () => {
        const first = getOrdinal(1);
        const second = getOrdinal(2);
        const third = getOrdinal(3);
        const fourth = getOrdinal(4);

        expect(first).toBe('1st');
        expect(second).toBe('2nd');
        expect(third).toBe('3rd');
        expect(fourth).toBe('4th');
    });

    it('Returns the current active season data', () => {
        const data = {
            id: 2,
            path: '/seasons/2/',
            players: [1, 3, 4, 5, 6, 7, 8, 2, 9],
            games: [1, 2],
            currentKitty: 25,
            active: true
        };

        expect(getCurrentSeason(seasons)).toStrictEqual(data);
    });
});
