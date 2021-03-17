import React from 'react';
import { graphql, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { WIDTH } from '../constants';

import styles from '../css/templates/game.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';

import {
    getOrdinal,
    getSeasonGames,
    getGamePlayers,
    getPlayerPoints,
    getPlayerGamePosition,
    getPlayerGames,
    getGameKnockouts
} from '../data/utils';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter: game } = data.markdownRemark;
    const { id: gameId, payout, knockouts } = game;

    const games = getSeasonGames(useGamesData(), game.season);
    const players = getGamePlayers(usePlayersData(), gameId);

    const playersWithPoints = players.map((player) => {
        const position = getPlayerGamePosition(game, player);

        const points = getPlayerPoints(game, player);

        // all games the player has played the season this game is in
        const playerGames = getPlayerGames(games, player.id);

        let seasonPoints = 0;
        playerGames.forEach((game) => {
            seasonPoints += getPlayerPoints(game, player);
        });

        return {
            ...player,
            position,
            points,
            seasonPoints: parseFloat(seasonPoints.toFixed(2))
        };
    });

    const playerColumns = [
        { field: 'position' },
        { field: 'profileImage', cellRendererFramework: ImageRenderer },
        { field: 'fullName' },
        { field: 'points' },
        { field: 'seasonPoints', headerName: `Season ${game.season} points` }
    ];

    const playerGrid = {
        ...gridOptions,
        columnDefs: playerColumns,
        onGridReady: (e) => {
            e.columnApi.applyColumnState({
                state: [
                    {
                        colId: 'points',
                        sort: 'desc'
                    }
                ]
            });
            if (WIDTH > 768) e.api.sizeColumnsToFit();
        }
    };

    const gameKnockouts = getGameKnockouts(knockouts, players);
    const mostKills = Math.max(
        ...gameKnockouts.map((knockout) => knockout.kills),
        0
    );
    const knockoutOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Game knockouts'
        },
        xAxis: {
            title: {
                text: 'Players'
            },
            categories: players.map((player) => player.firstName)
        },
        yAxis: {
            title: {
                text: 'Number of knockouts'
            },
            tickInterval: 1,
            max: mostKills
        },
        tooltip: {
            valueSuffix: ' knockouts'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Kill',
                data: gameKnockouts.map((data) => data.kills),
                color: 'green'
            },
            {
                name: 'Death',
                data: gameKnockouts.map((data) => data.deaths),
                color: 'red'
            }
        ]
    };

    return (
        <Layout>
            <section className={styles.Game}>
                <h1>Game {gameId}</h1>
                <p>Played on {game.date}</p>
                <h2>Payout</h2>
                <ul>
                    {payout.map((prize, i) => (
                        <li key={i}>
                            {getOrdinal(i + 1)} - £{prize.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <hr />
                <div className={styles.stats}>
                    <h3>Results</h3>
                    <div className='ag-theme-alpine'>
                        <AgGridReact
                            gridOptions={playerGrid}
                            rowData={playersWithPoints}
                            onRowClicked={(row) => navigate(row.data.path)}
                            domLayout='autoHeight'
                        />
                    </div>
                </div>
                <hr />
                <div className={styles.chart}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={knockoutOptions}
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
                season
                seasonGame
                date
                results
                points
                knockouts
                payout
                winner
            }
        }
    }
`;
