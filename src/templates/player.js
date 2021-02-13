import React from 'react';
import { graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/templates/player.module.scss';

import Layout from '../components/Layout';
import PositionRenderer from '../components/grid/PositionRenderer';
import PrizeRenderer from '../components/grid/PrizeRenderer';

import { useGamesData } from '../data/gamesData';
import { getPlayerGames } from '../data/utils';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const { id: playerId } = frontmatter;

    const games = useGamesData();
    const playerGames = getPlayerGames(games, playerId);

    const gameColumns = [
        { field: 'id' },
        { field: 'season' },
        { field: 'seasonGame' },
        {
            field: 'position',
            cellRendererFramework: PositionRenderer,
            cellRendererParams: { playerId }
        },
        {
            field: 'prize',
            cellRendererFramework: PrizeRenderer,
            cellRendererParams: { playerId }
        }
    ];

    const gameGrid = {
        ...gridOptions,
        columnDefs: gameColumns
    };

    return (
        <Layout>
            <section className={styles.Player}>
                <div className={styles.intro}>
                    <Img
                        className={styles.profileImage}
                        fluid={frontmatter.profileImage.childImageSharp.fluid}
                    />
                    <div className={styles.about}>
                        <h1>{frontmatter.fullName}</h1>
                        <p>
                            <b>Known as:</b> {frontmatter.fullNickName}
                            <br />
                            <b>Joined:</b> {frontmatter.joinedDate}
                            <br />
                            <b>Occupation:</b> {frontmatter.occupation}
                            {frontmatter.role && (
                                <>
                                    <br />
                                    <b>Role:</b> {frontmatter.role}
                                </>
                            )}
                        </p>
                    </div>
                </div>
                <div className={styles.blurb}>
                    <ReactMarkdown
                        source={frontmatter.blurb}
                        escapeHtml={false}
                    />
                </div>
                <hr />
                <h2>Poker career</h2>
                <ul>
                    <li>Career earnings: ${frontmatter.careerEarnings}</li>
                    <li>Seasons played: {frontmatter.seasonsPlayed}</li>
                    <li>Games played: {frontmatter.gamesPlayed}</li>
                </ul>
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
                firstName
                lastName
                fullName
                nickName
                fullNickName
                profileImage {
                    childImageSharp {
                        fluid(maxWidth: 200, quality: 90) {
                            ...GatsbyImageSharpFluid_noBase64
                        }
                    }
                }
                joinedDate
                occupation
                role
                blurb
                seasons
                games
                careerEarnings
                seasonsPlayed
                gamesPlayed
                currentSeasonPoints
            }
        }
    }
`;
