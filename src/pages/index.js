import React from 'react';

import styles from '../css/pages/index.module.scss';

import Layout from '../components/Layout';

// markup
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
                    scales as there are more playes. You will alwasy receive at
                    least 1 point for turning up.
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
