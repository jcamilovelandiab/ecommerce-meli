import React from 'react';
import styles from './grid.module.scss';

const Grid = ({ children, container, item, cols, spacing, style, ...otherProps }) => {
	const classNames = [
		container ? styles.grid_container : (item ? styles.grid_item : ''),
		cols ? styles[`grid_cols_${cols}`] : '',
		spacing ? styles[`grid_spacing_${spacing}`] : '',
		style
	];

	return (
		<div className={classNames.join(' ')} {...otherProps}>
			{ children }
		</div>
	);
}

export default Grid;
