import React from 'react';
import { graphql, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/templates/season.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';
import PlayerRenderer from '../components/grid/PlayerRenderer';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';
import { getSeasonGames, getSeasonPlayers } from '../data/utils';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const seasonId = frontmatter.id;

    // get data
    const gamesData = useGamesData();
    const games = getSeasonGames(gamesData, seasonId);

    const playersData = usePlayersData();
    const players = getSeasonPlayers(playersData, seasonId);

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
