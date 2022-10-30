import React from 'react';

import styles from './home.module.scss';

import Box from '../components/box/box';
import Grid from '../components/grid/grid';

const HomePage = () => {
	return (
		<div className={styles.home}>
			<Grid container spacing="md">
				<Grid item cols={6}>
					<Box>Box 1</Box>
				</Grid>
				<Grid item cols={6}>
					<Box>Box 2</Box>
				</Grid>
				<Grid item cols={6}>
					<Box>Box 3</Box>
				</Grid>
				<Grid item cols={6}>
					<Box>Box 4</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default HomePage;
