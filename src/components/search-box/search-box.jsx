import React, { useState } from 'react';

import styles from './search-box.module.scss';
import searchIcon from '../../assets/images/ic_Search.png';

const SearchBox = () => {
	const [input, setInput] = useState('');

	const handleChange = ({ target }) => {
		setInput(target.value);
	}

	return (
		<div className={styles.search}>
			<input
				className={styles.search_input}
				placeholder="Nunca dejes de buscar"
				aria-label="search-product"
				role="search"
				value={input}
				onChange={handleChange}
			/>
			<button className={styles.search_button}>
				<img src={searchIcon} alt='search' className={styles.search_icon} />
			</button>
		</div>
	)
};

export default SearchBox;
