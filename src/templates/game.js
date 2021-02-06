import React from 'react';
import { graphql, Link } from 'gatsby';

import styles from '../css/templates/game.module.scss';

import Layout from '../components/Layout';

import { getGamePlayers, getPlayer } from '../data/utils';
import { usePlayersData } from '../data/playersData';

export default function Template({ data }) {
    const { frontmatter } = data.markdownRemark;
    const gameId = frontmatter.id;
    const results = frontmatter.results;

    const playersData = usePlayersData();
    const players = getGamePlayers(playersData, gameId);

    return (
        <Layout>
            <section className={styles.Game}>
                <h1>Game {gameId}</h1>
                <p>Prize pool: {frontmatter.kitty}</p>
                <hr />
                <div className={styles.stats}>
                    <h2>Results</h2>
                    {results.map((result, i) => {
                        const player = getPlayer(players, result);

                        return (
                            <Link key={result} to={player.path}>
                                <p>
                                    {i + 1} - {player.fullName}
                                </p>
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
                path
                season
                seasonGame
                players
                results

                winner
                kitty
                complete
            }
        }
    }
`;
