import React from 'react';
import { saveAs } from 'file-saver';

import styles from '../css/pages/addGame.module.scss';

import Layout from '../components/Layout';

import { useGamesData } from '../data/gamesData';

const AddGame = () => {
    const gamesData = useGamesData();
    console.log('g', gamesData);

    const newGame = `---
id: 2
path: /games/2/
season: 1
seasonGame: 2

# player ids
players:
    - 1
    - 3
    - 4
    - 5
    - 6
    - 7
    - 8

# player ids in order of resutls
results:
    - 1
    - 4
    - 7
    - 8
    - 6
    - 3
    - 5

points:
    - 7
    - 5.6
    - 4.2
    - 2.8
    - 1.4
    - 1
    - 1

# player id
winner: 1

kitty: 22.05
complete: true
---
`;

    const blob = new Blob([newGame], {
        type: 'text/plain;charset=utf-8'
    });
    // saveAs(blob, '2-game.md');

    return (
        <Layout>
            <section className={styles.AddGame}>
                <h1>Add a game</h1>
            </section>
        </Layout>
    );
};

export default AddGame;
