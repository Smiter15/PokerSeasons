import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import { AgGridReact } from 'ag-grid-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { WIDTH } from '../constants';

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
    getPlayer,
    getPlayerPoints,
    getSeasonGames
} from '../data/utils';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
    const { frontmatter: player } = data.markdownRemark;
    const { id: playerId } = player;

    const allGames = useGamesData();
    const [games, setGames] = useState(getPlayerGames(allGames, playerId));

    const players = usePlayersData();
    const kdRatio = getPlayerKDRatio(games, playerId);
    const knockoutData = getPlayerKnockouts(games, players, playerId);
    const [playerIds, kills, deaths] = extract(knockoutData, [
        'id',
        'kills',
        'deaths'
    ]);
    const mostKills = Math.max(...kills);

    const handleSeasonSelect = (e) => {
        if (Number(e.target.value) === 0) {
            setGames(getPlayerGames(allGames, playerId));
        } else {
            setGames(
                getPlayerGames(
                    getSeasonGames(allGames, Number(e.target.value)),
                    playerId
                )
            );
        }
    };

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
        const points = getPlayerPoints(game, player);

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
        onGridReady: (e) => {
            if (WIDTH > 768) e.api.sizeColumnsToFit();
        }
    };

    return (
        <Layout>
            <section className={styles.Player}>
                <div className={styles.intro}>
                    <Img
                        className={styles.profileImage}
                        fluid={player.profileImage.childImageSharp.fluid}
                    />
                    <div className={styles.about}>
                        <h1>{player.fullName}</h1>
                        <p>
                            <b>Known as:</b> {player.fullNickName}
                            <br />
                            <b>Joined:</b> {player.joinedDate}
                            <br />
                            <b>Occupation:</b> {player.occupation}
                            {player.role && (
                                <>
                                    <br />
                                    <b>Role:</b> {player.role}
                                </>
                            )}
                        </p>
                    </div>
                </div>
                <div className={styles.blurb}>
                    <ReactMarkdown source={player.blurb} escapeHtml={false} />
                </div>
                <hr />
                <h2>Poker career</h2>
                <ul>
                    <li>
                        Career earnings: £{player.careerEarnings.toFixed(2)}
                    </li>
                    <li>Seasons played: {player.seasonsPlayed}</li>
                    <li>Games played: {player.gamesPlayed}</li>
                </ul>
                <hr />
                <div className={styles.knockoutTitle}>
                    <h2>Knockouts</h2>
                    <select onChange={handleSeasonSelect}>
                        <option value={0}>All seasons</option>
                        <option value={1}>Season 1</option>
                        <option value={2}>Season 2</option>
                    </select>
                </div>
                <p>Kill / death ratio: {kdRatio}</p>
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
