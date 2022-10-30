import React from 'react';
import styles from './grid.module.scss';

const Grid = ({ children, container, cols, spacing }) => {
	const gridClassName = container ? styles.grid_container : styles.grid_item;
	const colClassName = cols ? `${ styles['grid_cols_' + cols]}` : '';
	const spacingClassName = cols ? `${ styles['grid_spacing_' + spacing]}` : '';

	return (
		<div className={`${gridClassName}${colClassName}${spacingClassName}`}>
			{ children }
		</div>
	);
}

export default Grid;
