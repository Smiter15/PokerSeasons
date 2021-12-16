import React from 'react';
import { graphql, navigate } from 'gatsby';
import { AgGridReact } from 'ag-grid-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { WIDTH } from '../constants';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from '../css/templates/season.module.scss';

import Layout from '../components/Layout';
import ImageRenderer from '../components/grid/ImageRenderer';
import WinnerRenderer from '../components/grid/WinnerRenderer';

import {
	getSeasonGames,
	getSeasonPlayers,
	getPlayerGames,
	getPlayerPoints,
	getPlayerKDRatio,
	getSeasonKnockouts,
	getPlayerBubbles,
} from '../data/utils';

import { useGamesData } from '../data/gamesData';
import { usePlayersData } from '../data/playersData';

import { gridOptions } from '../components/grid/utils';

export default function Template({ data }) {
	const { frontmatter: season } = data.markdownRemark;
	const { id: seasonId } = season;

	// get data
    console.log('data', useGamesData(), seasonId)
	const games = getSeasonGames(useGamesData(), seasonId);
	const players = getSeasonPlayers(usePlayersData(), seasonId);

	// calculate season points
	const playersWithAddedData = players.map((player) => {
		// all games the player has played this season
		const playerGames = getPlayerGames(games, player.id);

		let seasonPoints = 0;
		playerGames.forEach((game) => {
			seasonPoints += getPlayerPoints(game, player);
		});

		return {
			...player,
			kdRatio: getPlayerKDRatio(games, player.id),
			bubbles: getPlayerBubbles(games, player.id),
			points: parseFloat(seasonPoints.toFixed(2)),
			gamesPlayed: playerGames.length,
		};
	});

	const playerColumns = [
		{ field: 'profileImage', cellRendererFramework: ImageRenderer },
		{ field: 'fullName' },
		{ field: 'points' },
		{ field: 'kdRatio' },
		{ field: 'bubbles' },
		{ field: 'gamesPlayed' },
	];

	const playerGrid = {
		...gridOptions,
		columnDefs: playerColumns,
		onGridReady: (e) => {
			e.columnApi.applyColumnState({
				state: [
					{
						colId: 'points',
						sort: 'desc',
					},
				],
			});
			if (WIDTH > 768) e.api.sizeColumnsToFit();
		},
	};

	const gameColumns = [
		{ field: 'id' },
		{ field: 'seasonGame' },
		{
			field: 'winner',
			cellRendererFramework: WinnerRenderer,
			cellRendererParams: { players },
		},
		{
			field: 'points',
			cellRendererFramework: (col) => col.value[0],
		},
		{
			field: 'payout',
			headerName: 'Prize',
			cellRendererFramework: (col) => `£${col.value[0].toFixed(2)}`,
		},
	];

	const gameGrid = {
		...gridOptions,
		columnDefs: gameColumns,
		onGridReady: (e) => {
			if (WIDTH > 768) e.api.sizeColumnsToFit();
		},
	};

	const pointsSeries = players.map((player) => {
		const pointsData = games.map((game) => {
			// for each game get index of result for player
			const resultIndex = game.results.findIndex(
				(result) => result === player.id
			);

			// return array of points for season, return 0 if player did not play that game
			return game.points[resultIndex] || 0;
		});

		const cumulativePoints = (
			(sum) => (value) =>
				(sum += value)
		)(0);
		const seasonData = pointsData.map(cumulativePoints);

		return {
			name: player.fullName,
			data: seasonData,
		};
	});

	const pointsOptions = {
		chart: {
			type: 'areaspline',
		},
		title: {
			text: `Season ${seasonId} - Game on game points`,
		},
		xAxis: {
			title: {
				text: 'Season games',
			},
			categories: games.map((game) => `After ${game.seasonGame} games`),
		},
		yAxis: {
			title: {
				text: 'Season points',
			},
		},
		tooltip: {
			shared: true,
			valueSuffix: ' points',
			valueDecimals: 2,
		},
		credits: {
			enabled: false,
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.03,
			},
		},
		series: pointsSeries,
	};

	const seasonKnockouts = getSeasonKnockouts(games, players);
	const mostKills = Math.max(
		...seasonKnockouts.map((knockout) => knockout.kills),
		0
	);
	const knockoutOptions = {
		chart: {
			type: 'column',
		},
		title: {
			text: 'Season knockouts',
		},
		xAxis: {
			title: {
				text: 'Players',
			},
			categories: players.map((player) => player.firstName),
		},
		yAxis: {
			title: {
				text: 'Number of knockouts',
			},
			tickInterval: 1,
			max: mostKills,
		},
		tooltip: {
			valueSuffix: ' knockouts',
		},
		credits: {
			enabled: false,
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},
		series: [
			{
				name: 'Kill',
				data: seasonKnockouts.map((data) => data.kills),
				color: 'green',
			},
			{
				name: 'Death',
				data: seasonKnockouts.map((data) => data.deaths),
				color: 'red',
			},
		],
	};

	return (
		<Layout>
			<section className={styles.Season}>
				<h1>Season {seasonId}</h1>
				Money in the kitty: £{season.kitty}
				<hr />
				<div className={styles.stats}>
					<h2>Standings</h2>
					<div className="ag-theme-alpine">
						<AgGridReact
							gridOptions={playerGrid}
							rowData={playersWithAddedData}
							onRowClicked={(row) => navigate(row.data.path)}
							domLayout="autoHeight"
						/>
					</div>
				</div>
				<div className={styles.chart}>
					<HighchartsReact highcharts={Highcharts} options={pointsOptions} />
				</div>
				<hr />
				<div className={styles.chart}>
					<HighchartsReact highcharts={Highcharts} options={knockoutOptions} />
				</div>
				<hr />
				<h2>Games</h2>
				<div className="ag-theme-alpine">
					<AgGridReact
						gridOptions={gameGrid}
						rowData={games}
						onRowClicked={(row) => navigate(row.data.path)}
						domLayout="autoHeight"
					/>
				</div>
			</section>
		</Layout>
	);
}

export const pageQuery = graphql`
	query ($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			frontmatter {
				id
				path
				players
				games
				kitty
				active
			}
		}
	}
`;
