import React from 'react';
import { graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import { AgGridReact } from 'ag-grid-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/templates/player.module.scss';

import Layout from '../components/Layout';
import PositionRenderer from '../components/grid/PositionRenderer';
import PrizeRenderer from '../components/grid/PrizeRenderer';

import {
    extract,
    getPlayerGames,
    getPlayerKDRatio,
    getPlayerKnockouts,
    getPlayer
} from '../data/utils';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const { id: playerId } = frontmatter;

    const gamesData = useGamesData();
    const games = getPlayerGames(gamesData, playerId);

    const players = usePlayersData();

    const [k, d] = getPlayerKDRatio(games, playerId);

    const knockoutData = getPlayerKnockouts(games, players, playerId);
    const [playerIds, kills, deaths] = extract(knockoutData, [
        'id',
        'kills',
        'deaths'
    ]);

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Knockouts'
        },
        xAxis: {
            title: {
                text: 'Players'
            },
            categories: playerIds.map((id) => getPlayer(players, id).firstName)
        },
        yAxis: {
            title: {
                text: 'Number of knockouts'
            },
            tickInterval: 1
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
                data: kills,
                color: 'green'
            },
            {
                name: 'Death',
                data: deaths,
                color: 'red'
            }
        ]
    };

    const gamesWithPoints = games.map((game) => {
        const playerResult = game.results.filter(
            (result) => result === playerId
        )[0];
        const playerResultIndex = game.results.indexOf(playerResult);
        const points = game.points[playerResultIndex];

        return {
            ...game,
            points
        };
    });

    const gameColumns = [
        { field: 'id' },
        { field: 'season' },
        { field: 'seasonGame' },
        {
            field: 'position',
            cellRendererFramework: PositionRenderer,
            cellRendererParams: { playerId }
        },
        { field: 'points' },
        {
            field: 'prize',
            cellRendererFramework: PrizeRenderer,
            cellRendererParams: { playerId }
        }
    ];

    const gameGrid = {
        ...gridOptions,
        columnDefs: gameColumns,
        onGridReady: (e) => e.api.sizeColumnsToFit()
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
                    <li>
                        Career earnings: $
                        {frontmatter.careerEarnings.toFixed(2)}
                    </li>
                    <li>Seasons played: {frontmatter.seasonsPlayed}</li>
                    <li>Games played: {frontmatter.gamesPlayed}</li>
                </ul>
                <hr />
                <h2>Knockouts</h2>
                <p>
                    Kill / death ratio:{' '}
                    {d === 0 ? k.toFixed(2) : (k / d).toFixed(2)}
                </p>
                <HighchartsReact highcharts={Highcharts} options={options} />
                <hr />
                <h2>Games</h2>
                <div className='ag-theme-alpine'>
                    <AgGridReact
                        gridOptions={gameGrid}
                        rowData={gamesWithPoints}
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
            }
        }
    }
`;
