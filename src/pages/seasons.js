import React from 'react';
import { Link } from 'gatsby';

import styles from '../css/pages/seasons.module.scss';

import Layout from '../components/Layout';

import { getCurrentSeason } from '../data/utils';

import { useSeasonsData } from '../data/seasonsData';

const Seasons = () => {
	const seasons = useSeasonsData();

	const activeSeason = getCurrentSeason(seasons);

	return (
		<Layout>
			<section className={styles.Seasons}>
				<h1>Seasons</h1>
				<p>Seaons change slightly as we refine the fun level.</p>
				<h3>Season 0 - The tester</h3>
				<p>
					The first season was to see if people were keen and if the site would
					work.
				</p>
				<h3>Season 1 - Game time</h3>
				<p>
					First season to run with treasurer and handling finances in house.
					Runs for 8 weeks, minimum points for turning up are 5 and some side
					pots added for lols.
				</p>
				<h3>Season 2 - The rebuy</h3>
				<p>
					Minor tweaks to point and prize distribution. Added a 2nd chance
					rebuy, if you go out within the first half hour you can rebuy for £5
					to get your stating chips back.
				</p>
				<h3>Season 3 - Christmas special 2021</h3>
				<p>Christmas miracle, return to online poker and zoom 🙌</p>
				<div className={styles.active}>
					<h2>Active season</h2>
					<Link to={activeSeason.path}>Season {activeSeason.id}</Link>
				</div>
				<hr />
				<h3>All seasons</h3>
				<p>
					<Link to="/seasons/0/">Season 0</Link>
				</p>
				<p>
					<Link to="/seasons/1/">Season 1</Link>
				</p>
				<p>
					<Link to="/seasons/2/">Season 2</Link>
				</p>
			</section>
		</Layout>
	);
};

export default Seasons;
