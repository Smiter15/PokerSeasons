import { getOrdinal } from '../../data/utils';

const PositionRenderer = (column) =>
    getOrdinal(column.data.results.indexOf(column.playerId) + 1);

export default PositionRenderer;
