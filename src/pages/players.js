import React from 'react';
import { navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/pages/players.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';

import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

const Players = () => {
    const players = usePlayersData();

    const playerColumns = [
        { field: 'profileImage', cellRendererFramework: ImageRenderer },
        { field: 'fullName' },
        { field: 'careerEarnings' },
        { field: 'currentSeasonPoints' },
        { field: 'gamesPlayed' }
    ];

    const playerGrid = {
        ...gridOptions,
        columnDefs: playerColumns
    };

    return (
        <Layout>
            <section className={styles.Players}>
                <h1>Players</h1>
                <p>All our players! Click a row to see the profile</p>
                <div className='ag-theme-alpine'>
                    <AgGridReact
                        gridOptions={playerGrid}
                        rowData={players}
                        onRowClicked={(row) => navigate(row.data.path)}
                        domLayout='autoHeight'
                    />
                </div>
            </section>
        </Layout>
    );
};

export default Players;
