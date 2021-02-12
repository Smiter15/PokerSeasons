import React from 'react';
import { graphql, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';

import styles from '../css/templates/game.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';
import PointsRenderer from '../components/grid/PointsRenderer';

import { getOrdinal, getGamePlayers } from '../data/utils';
import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const { id: gameId, payout } = frontmatter;

    // data
    const players = getGamePlayers(usePlayersData(), gameId);

    const playerColumns = [
        { field: 'profileImage', cellRendererFramework: ImageRenderer },
        { field: 'fullName' },
        {
            field: 'points',
            cellRendererFramework: PointsRenderer,
            cellRendererParams: { game: frontmatter }
        },
        { field: 'currentSeasonPoints' }
    ];

    const playerGrid = {
        ...gridOptions,
        columnDefs: playerColumns
    };

    return (
        <Layout>
            <section className={styles.Game}>
                <h1>Game {gameId}</h1>
                <h2>Payout</h2>
                <ul>
                    {payout.map((prize, i) => (
                        <li key={i}>
                            {i + 1}
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
                            rowData={players}
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
                players
                results
                points
                payout
                winner
            }
        }
    }
`;
