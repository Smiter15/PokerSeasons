import React from 'react';
import { graphql, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';

import styles from '../css/templates/game.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';

import { getOrdinal, getGamePlayers } from '../data/utils';
import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const { id: gameId, payout } = frontmatter;

    const players = getGamePlayers(usePlayersData(), gameId);

    const playersWithGamePoints = players.map((player) => {
        const playerResult = frontmatter.results.filter(
            (result) => result === player.id
        )[0];
        const playerResultIndex = frontmatter.results.indexOf(playerResult);
        const points = frontmatter.points[playerResultIndex];

        return {
            ...player,
            points
        };
    });

    const playerColumns = [
        { field: 'profileImage', cellRendererFramework: ImageRenderer },
        { field: 'fullName' },
        { field: 'points' },
        { field: 'currentSeasonPoints' }
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
        }
    };

    return (
        <Layout>
            <section className={styles.Game}>
                <h1>Game {gameId}</h1>
                <p>Played on {frontmatter.date}</p>
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
                            rowData={playersWithGamePoints}
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
