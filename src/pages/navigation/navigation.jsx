import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './navigation.module.scss';
import smallMeliLogo from '../../assets/images/Logo_ML.png';

import Grid from '../../components/grid/grid';
import SearchBox from '../../components/search-box/search-box';

const Navigation = () => {

	return (
		<div className={styles.navigation}>
			<div className={styles.navigation_content}>
				<Grid container style={styles.grid}>
					<Grid item cols={1}/>
					<Grid item cols={1} style={styles.logo_container}>
						<img src={smallMeliLogo} alt='search' className={styles.logo_image} />
					</Grid>
					<Grid item cols={9}>
						<SearchBox />
					</Grid>
					<Grid item cols={1}/>
				</Grid>
			</div>
			<Outlet />
		</div>
	)
};

export default Navigation;
