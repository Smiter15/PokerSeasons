import React from 'react';
import { graphql, Link } from 'gatsby';

import styles from '../css/templates/season.module.scss';

import Layout from '../components/Layout';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';
import { getSeasonGames, getSeasonPlayers } from '../data/utils';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const seasonId = frontmatter.id;

    const gamesData = useGamesData();
    const games = getSeasonGames(gamesData, seasonId);

    const playersData = usePlayersData();
    const players = getSeasonPlayers(playersData, seasonId);

    return (
        <Layout>
            <section className={styles.Season}>
                <h1>Season {seasonId}</h1>
                <p>Money in the kitty: {frontmatter.currentKitty}</p>
                <hr />
                <div className={styles.stats}>
                    <h2>This season's games</h2>
                    {games.map((game) => {
                        game = game.node.frontmatter;

                        return (
                            <Link key={game.id} to={game.path}>
                                <p>Game {game.seasonGame}</p>
                            </Link>
                        );
                    })}
                </div>
                <div className={styles.stats}>
                    <h2>This season's players</h2>
                    {players.map((player) => {
                        player = player.node.frontmatter;

                        return (
                            <Link key={player.id}>
                                <p>{player.fullName}</p>
                            </Link>
                        );
                    })}
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
