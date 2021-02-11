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
                    <iframe
                        style={{ borderRadius: 16 }}
                        src='https://giphy.com/embed/DHqth0hVQoIzS'
                        width='480'
                        height='206'
                        frameBorder='0'
                        class='giphy-embed'
                    ></iframe>
                </p>
                <p>
                    You can see it{' '}
                    <a
                        href='https://docs.google.com/spreadsheets/d/1RpjQhEpLUrGxo2SMLNukIej3RCxWOJlDYTte0GntRm0'
                        target='_blank'
                    >
                        here
                    </a>
                    . Please don't change the formula!
                </p>
            </section>
        </Layout>
    );
};

export default HomePage;
