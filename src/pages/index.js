import React from 'react';

import styles from '../css/pages/index.module.scss';

import Layout from '../components/Layout';

const HomePage = () => {
    return (
        <Layout>
            <section className={styles.Home}>
                <h1>Poker Seasons</h1>
                <h3>Season 1</h3>
                <p>
                    Just proof of concept, no season cash. Will record like 5
                    games to see if people like it.
                </p>
                <p>
                    Lew helped create a formula for calulating points that
                    scales as there are more playes. The higher you finish the
                    more points you get relative to the other players.
                </p>
                <p>
                    <b>Formula</b>: Square root(Number of players/position of
                    player) x 10
                </p>
                <p>
                    <img
                        src='https://media.giphy.com/media/idKeY3nvmdIsM/giphy-downsized.gif'
                        alt='What is math'
                        style={{ borderRadius: 16 }}
                    />
                </p>
                <p>
                    You can see it{' '}
                    <a
                        href='https://docs.google.com/spreadsheets/d/1RpjQhEpLUrGxo2SMLNukIej3RCxWOJlDYTte0GntRm0'
                        target='_blank'
                        rel='noreferrer'
                    >
                        here
                    </a>
                    . Check out row 60. Please don't change the formula!
                </p>
                <h3>Upcoming features</h3>
                <ul>
                    <li>Knock out statistics</li>
                </ul>
            </section>
        </Layout>
    );
};

export default HomePage;
