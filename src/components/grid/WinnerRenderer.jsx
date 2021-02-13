import { getPlayer } from '../../data/utils';

const WinnerRenderer = (column) =>
    getPlayer(column.players, column.data.winner).fullName;

export default WinnerRenderer;
