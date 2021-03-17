import React from 'react';
import { navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';

import { WIDTH } from '../constants';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/pages/players.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';

import {
    getCurrentSeason,
    getSeasonGames,
    getPlayerPoints,
    getPlayerGames
} from '../data/utils';

import { useSeasonsData } from '../data/seasonsData';
import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

const Players = () => {
    // data
    const season = getCurrentSeason(useSeasonsData());
    const games = getSeasonGames(useGamesData(), season.id);
    const players = usePlayersData();

    const playersWithSeasonPoints = players.map((player) => {
        // all games the player has played the in current season
        const playerGames = getPlayerGames(games, player.id);

        let seasonPoints = 0;
        playerGames.forEach((game) => {
            seasonPoints += getPlayerPoints(game, player);
        });

        return {
            ...player,
            seasonPoints: parseFloat(seasonPoints.toFixed(2))
        };
    });

    const playerColumns = [
        { field: 'profileImage', cellRendererFramework: ImageRenderer },
        { field: 'fullName' },
        {
            field: 'careerEarnings',
            cellRendererFramework: (column) => `£${column.value.toFixed(2)}`
        },
        { field: 'seasonPoints', headerName: 'Current season points' },
        { field: 'gamesPlayed' }
    ];

    const playerGrid = {
        ...gridOptions,
        columnDefs: playerColumns,
        onGridReady: (e) => {
            e.columnApi.applyColumnState({
                state: [
                    {
                        colId: 'seasonPoints',
                        sort: 'desc'
                    }
                ]
            });
            if (WIDTH > 768) e.api.sizeColumnsToFit();
        }
    };

    return (
        <Layout>
            <section className={styles.Players}>
                <h1>Players</h1>
                <p>All our players! Click a row to see the profile</p>
                <div className='ag-theme-alpine'>
                    <AgGridReact
                        gridOptions={playerGrid}
                        rowData={playersWithSeasonPoints}
                        onRowClicked={(row) => navigate(row.data.path)}
                        domLayout='autoHeight'
                    />
                </div>
            </section>
        </Layout>
    );
};

export default Players;
