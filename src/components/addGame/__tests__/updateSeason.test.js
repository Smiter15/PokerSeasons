import { generateSeasonMD } from '../updateSeason';
import { getCurrentSeason } from '../../../data/utils';
import { seasons } from '../../../../__mocks__/data/seasons';

describe('Update season', () => {
    it('Creates a MD file with updated data when a new game is created', () => {
        const activeSeason = getCurrentSeason(seasons);
        const updatedSeasonTest = `---
id: 2
path: /seasons/2/

players:
- 1
- 2

games:
- 3
- 4

currentKitty: 29.00
active: true
---`;

        const updatedSeason = generateSeasonMD(activeSeason, 4, 2);

        expect(updatedSeason).toBe(updatedSeasonTest);
    });
});
