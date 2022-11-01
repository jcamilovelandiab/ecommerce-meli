import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import styles from './search-box.module.scss';
import searchIcon from '../../assets/images/ic_Search.png';

const SearchBox = () => {
	const [input, setInput] = useState('');
	const navigate = useNavigate();

	const handleChange = ({ target }) => {
		setInput(target.value);
	}

	const handleClick = () => {
		if (input.trim() !== '') {
			const params = { search: input };
			navigate({
				pathname: '/items',
				search: `?${createSearchParams(params)}`
			});
		}
	}

	const handleKeyDown = (event) => {
		if(event.key === 'Enter') handleClick();
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
				onKeyDown={handleKeyDown}
			/>
			<button className={styles.search_button} onClick={handleClick}>
				<img src={searchIcon} alt='search' className={styles.search_icon} />
			</button>
		</div>
	)
};

export default SearchBox;
