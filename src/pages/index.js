import React from 'react';

import styles from '../css/pages/index.module.scss';

import Layout from '../components/Layout';

const HomePage = () => {
    return (
        <Layout>
            <section className={styles.Home}>
                <h1>Poker Seasons</h1>
                <h3>Season 2</h3>
                <p>
                    First official season kick off! Buy in £5, half goes to the
                    night's game half to to the season kitty.
                </p>
                <p>
                    <b>Changes from season 1:</b>
                    <br />
                    - The season will run 8 weeks
                    <br />
                    - Minimum points for turning up is reduced from 10 to 5 so
                    less detrimental if you miss a game
                    <br />- Points given will be less spread apart from position
                    to position to increase competitiveness
                </p>
                <p>
                    <b>Prizes:</b>
                    <br />
                    - 1st 40% of kitty
                    <br />
                    - 2nd 25% of kitty
                    <br />
                    - 3rd 15% of kitty
                    <br />
                    <b>Side pots:</b>
                    <br />
                    - 10% for best K/D ratio (knockoutsto being knocked out)
                    <br />- 10% for most bubble positions
                </p>
                <p>
                    <b>Formula</b>: Square root(Number of players/position of
                    player) x 5
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
            </section>
        </Layout>
    );
};

export default HomePage;
