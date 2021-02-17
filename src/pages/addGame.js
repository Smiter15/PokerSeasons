import React, { useState } from 'react';
import Select from 'react-select';
import { saveAs } from 'file-saver';

import styles from '../css/pages/addGame.module.scss';

import Layout from '../components/Layout';

import { useSeasonsData } from '../data/seasonsData';
import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';
import {
    getCurrentSeason,
    getSeasonGames,
    getSeasonPlayers,
    mapPlayersForSelect,
    getPoints,
    getPlayer
} from '../data/utils';

import { createGame } from '../components/addGame/createGame';
import { updatePlayer } from '../components/addGame/updatePlayer';

const AddGame = () => {
    // get data
    const currentSeason = getCurrentSeason(useSeasonsData());

    const gamesData = useGamesData();
    const seasonGames = getSeasonGames(gamesData, currentSeason.id);

    const players = getSeasonPlayers(usePlayersData(), currentSeason.id);

    const newGameId = gamesData.length + 1;
    const seasonGameCount = seasonGames.length + 1;

    const [playerOptions, setPlayerOptions] = useState(
        mapPlayersForSelect(players)
    );
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const [date, setDate] = useState(null);
    const [payout1, setpayout1] = useState(0);
    const [payout2, setpayout2] = useState(0);
    const [payout3, setpayout3] = useState(0);

    // functions

    const handleSelectPlayer = (player) => {
        setSelectedPlayers([...selectedPlayers, player]);
        // remove selected player from options list
        setPlayerOptions(
            playerOptions.filter(
                (playerOption) => playerOption.value !== player.value
            )
        );
    };

    const removePlayer = (player) => {
        setPlayerOptions([...playerOptions, player]);
        // remove player from results list
        setSelectedPlayers(
            selectedPlayers.filter(
                (selectedPlayer) => selectedPlayer.value !== player.value
            )
        );
    };

    const addGame = () => {
        // update players
        selectedPlayers.forEach((player, i) => {
            const points = getPoints(selectedPlayers.length, i + 1);
            const prize =
                [parseFloat(payout1), parseFloat(payout2), parseFloat(payout3)][
                    i
                ] || 0;
            updatePlayer(
                getPlayer(players, player.value),
                newGameId,
                points,
                prize
            );
        });
        // create game
        const blob = new Blob(
            [
                createGame(
                    newGameId,
                    currentSeason.id,
                    seasonGameCount,
                    selectedPlayers,
                    date,
                    [
                        parseFloat(payout1),
                        parseFloat(payout2),
                        parseFloat(payout3)
                    ]
                )
            ],
            {
                type: 'text/plain;charset=utf-8'
            }
        );
        saveAs(blob, `${newGameId}-game.md`);
    };

    return (
        <Layout>
            <section className={styles.AddGame}>
                <h1>Add a game</h1>

                <h3>Choose player</h3>
                <Select onChange={handleSelectPlayer} options={playerOptions} />
                <br />
                <hr />

                <h3>Results of game</h3>
                <ul>
                    {selectedPlayers.map((player, i) => {
                        const points = getPoints(selectedPlayers.length, i + 1);

                        return (
                            <li key={player.value} className={styles.listItem}>
                                {i + 1} - {player.label} - points: {points}
                                <button onClick={() => removePlayer(player)}>
                                    x
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <h3>Played on</h3>
                <label htmlFor='date'>Date played</label>
                <input
                    id='date'
                    type='date'
                    onChange={(e) => setDate(e.target.value)}
                />
                <br />index

                <h3>Payout</h3>
                <label htmlFor='first'>1st</label>
                <input
                    id='first'
                    onChange={(e) => setpayout1(e.target.value)}
                />
                <br />
                <label htmlFor='second'>2nd</label>
                <input
                    id='second'
                    onChange={(e) => setpayout2(e.target.value)}
                />
                <br />
                <label htmlFor='third'>3rd</label>
                <input
                    id='third'
                    onChange={(e) => setpayout3(e.target.value)}
                />
                <br />
                <br />

                <button onClick={addGame}>Add game</button>
            </section>
        </Layout>
    );
};

export default AddGame;
