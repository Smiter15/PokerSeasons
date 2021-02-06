import React from 'react';
import { graphql, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';
import Chart from 'react-apexcharts';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/templates/season.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';
import PlayerRenderer from '../components/grid/PlayerRenderer';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';
import { useSnapshotData } from '../data/snapshotData';
import {
    removeNodeFrontmatter,
    getSeasonGames,
    getSeasonPlayers
} from '../data/utils';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const seasonId = frontmatter.id;

    // get data
    const gamesData = useGamesData();
    const games = getSeasonGames(gamesData, seasonId);

    const playersData = usePlayersData();
    const players = getSeasonPlayers(playersData, seasonId);

    const snapshotData = useSnapshotData();
    const snapshots = removeNodeFrontmatter(snapshotData);

    const playerColumns = [
        { field: 'profileImage', cellRendererFramework: ImageRenderer },
        { field: 'fullName' },
        { field: 'currentSeasonPoints' },
        { field: 'gamesPlayed' }
    ];

    const playerGrid = {
        ...gridOptions,
        columnDefs: playerColumns
    };

    const gameColumns = [
        { field: 'seasonGame' },
        { field: 'kitty' },
        {
            field: 'winner',
            cellRendererFramework: PlayerRenderer,
            cellRendererParams: { players }
        }
    ];

    const gameGrid = {
        ...gridOptions,
        columnDefs: gameColumns
    };

    const options = {
        chart: {
            id: 'Season 1 standings',
            type: 'area',
            toolbar: {
                show: false
            }
        },
        stroke: {
            curve: 'smooth'
        },
        yaxis: {
            title: {
                text: 'Season points'
            }
        },
        xaxis: {
            categories: [1, 2],
            title: {
                text: 'Seasons game'
            }
        },
        title: {
            text: 'Season 1 - running total of points'
        }
    };

    const series = [
        {
            name: 'Matt Smithson',
            data: [7, 14]
        },
        {
            name: 'Will Whitell',
            data: [10, 10]
        },
        {
            name: 'Tom Stell',
            data: [0, 10]
        }
    ];

    return (
        <Layout>
            <section className={styles.Season}>
                <h1>Season {seasonId}</h1>
                <p>Money in the kitty: {frontmatter.currentKitty}</p>
                <hr />
                <div className={styles.stats}>
                    <h2>Standings</h2>
                    <div className='ag-theme-alpine'>
                        <AgGridReact
                            gridOptions={playerGrid}
                            rowData={players}
                            onRowClicked={(row) => navigate(row.data.path)}
                            domLayout='autoHeight'
                        />
                    </div>
                </div>
                <div className={styles.chart}>
                    <Chart
                        options={options}
                        series={series}
                        type='area'
                        width='100%'
                        // height={320}
                    />
                </div>
                <hr />
                <div className={styles.stats}>
                    <h2>Games</h2>
                    <div className='ag-theme-alpine'>
                        <AgGridReact
                            gridOptions={gameGrid}
                            rowData={games}
                            onRowClicked={(row) => navigate(row.data.path)}
                            domLayout='autoHeight'
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            frontmatter {
                id
                players
                currentKitty
            }
        }
    }
`;
