import React from 'react';
import { graphql, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';

import styles from '../css/templates/game.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';

import {
    getOrdinal,
    getSeasonGames,
    getGamePlayers,
    getPlayerPoints,
    getPlayerGamePosition,
    getPlayerGames
} from '../data/utils';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter: game } = data.markdownRemark;
    const { id: gameId, payout } = game;

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
            seasonPoints: seasonPoints.toFixed(2)
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
            e.api.sizeColumnsToFit();
        }
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
                            {getOrdinal(i + 1)} - ${prize.toFixed(2)}
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
