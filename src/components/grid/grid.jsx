import React from 'react';
import styles from './grid.module.scss';

const Grid = ({ children, container, cols, spacing }) => {
	const classNames = [
		container ? styles.grid_container : styles.grid_item,
		cols ? styles[`grid_cols_${cols}`] : '',
		spacing ? styles[`grid_spacing_${spacing}`] : ''
	]

	return (
		<div className={classNames.join(' ')}>
			{ children }
		</div>
	);
}

export default Grid;
