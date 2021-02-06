import { getPlayer } from '../../data/utils';

const PlayerRenderer = (column) =>
    getPlayer(column.players, column.data.winner).fullName;

export default PlayerRenderer;
