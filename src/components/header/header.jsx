import React from 'react';

import styles from './header.module.scss';
import smallMeliLogo from '../../assets/images/Logo_ML.png';

import Grid from '../grid/grid';
import SearchBox from '../search-box/search-box';

const Header = () => {

	return (
		<div className={styles.header}>
			<div className={styles.header_content}>
				<Grid container className={styles.grid} style={styles.grid}>
					<Grid item cols={1} />
					<Grid item cols={1}>
						<img src={smallMeliLogo} alt='search' className={styles.logo} />
					</Grid>
					<Grid item cols={9}>
						<SearchBox />
					</Grid>
					<Grid item cols={1}/>
				</Grid>
			</div>
		</div>
	)
};

export default Header;
