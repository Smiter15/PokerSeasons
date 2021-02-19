import React from 'react';
import { graphql, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/templates/season.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';
import WinnerRenderer from '../components/grid/WinnerRenderer';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';
import { getSeasonGames, getSeasonPlayers } from '../data/utils';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const seasonId = frontmatter.id;

    // get data
    const games = getSeasonGames(useGamesData(), seasonId);
    const players = getSeasonPlayers(usePlayersData(), seasonId);

    const playerColumns = [
        { field: 'profileImage', cellRendererFramework: ImageRenderer },
        { field: 'fullName' },
        { field: 'currentSeasonPoints' },
        { field: 'gamesPlayed' }
    ];

    const playerGrid = {
        ...gridOptions,
        columnDefs: playerColumns,
        onGridReady: (e) => {
            e.columnApi.applyColumnState({
                state: [
                    {
                        colId: 'currentSeasonPoints',
                        sort: 'desc'
                    }
                ]
            });
            e.api.sizeColumnsToFit();
        }
    };

    const gameColumns = [
        { field: 'id' },
        { field: 'seasonGame' },
        {
            field: 'winner',
            cellRendererFramework: WinnerRenderer,
            cellRendererParams: { players }
        }
    ];

    const gameGrid = {
        ...gridOptions,
        columnDefs: gameColumns
    };

    const series = players.map((player) => {
        const pointsData = games.map((game) => {
            // for each game get index of result for player
            const resultIndex = game.results.findIndex(
                (result) => result === player.id
            );

            // return array of points for season, return 0 if player did not play that game
            return game.points[resultIndex] || 0;
        });

        const cumulativePoints = ((sum) => (value) => (sum += value))(0);
        const seasonData = pointsData.map(cumulativePoints);

        return {
            name: player.fullName,
            data: seasonData
        };
    });

    const options = {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Season 1 - Game on game points'
        },
        xAxis: {
            title: {
                text: 'Season games'
            },
            categories: games.map((game) => `After ${game.seasonGame} games`)
        },
        yAxis: {
            title: {
                text: 'Season points'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' points',
            valueDecimals: 2
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.3
            }
        },
        series
    };

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
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
                <hr />
                <h2>Games</h2>
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
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            frontmatter {
                id
                path
                players
                games
                currentKitty
                active
            }
        }
    }
`;
