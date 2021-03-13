import React from 'react';
import { Link, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';

import { WIDTH } from '../constants';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/pages/games.module.scss';

import Layout from '../components/Layout';
import WinnerRenderer from '../components/grid/WinnerRenderer';

import { gridOptions } from '../components/grid/utils';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';

const Games = () => {
    const games = useGamesData();
    const players = usePlayersData();

    const lastGame = games.slice(-1)[0];

    const gameColumns = [
        { field: 'id' },
        { field: 'season' },
        { field: 'seasonGame' },
        {
            field: 'winner',
            cellRendererFramework: WinnerRenderer,
            cellRendererParams: { players }
        }
    ];

    const gameGrid = {
        ...gridOptions,
        columnDefs: gameColumns,
        onGridReady: (e) => {
            if (WIDTH > 768) e.api.sizeColumnsToFit();
        }
    };

    return (
        <Layout>
            <section className={styles.Games}>
                <h1>Games</h1>
                <div className={styles.active}>
                    <h2>Last game</h2>
                    <Link to={lastGame.path}>Game {lastGame.id}</Link>
                </div>
                <hr />
                <h3>All games</h3>
                <div className='ag-theme-alpine'>
                    <AgGridReact
                        gridOptions={gameGrid}
                        rowData={games}
                        onRowClicked={(row) => navigate(row.data.path)}
                        domLayout='autoHeight'
                    />
                </div>
            </section>
        </Layout>
    );
};

export default Games;
