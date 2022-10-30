import React from 'react';
import Grid from '../grid/grid';

import styles from './layout.module.scss';

const Layout = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Grid container>
				<Grid item cols={1} />
				<Grid item cols={10} style={styles.layout_main}>
					{ children }
				</Grid>
				<Grid item cols={1} />
			</Grid>
		</div>
	);
}

export default Layout;
