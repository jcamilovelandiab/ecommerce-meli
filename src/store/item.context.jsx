import React, { useReducer } from 'react';
import axios from 'axios';
import { getMostRepeatedCategory } from '../util/item.util';

const INITIAL_STATE = {
	items: [],
	categories: []
};

const actions = {
	FETCH_ITEMS_SUCCESS: 'FETCH_ITEMS_SUCCESS',
	UPDATE_CATEGORIES: 'UPDATE_CATEGORIES'
}

const reducer = (state, action) => {
	switch (action.type) {
		case actions.FETCH_ITEMS_SUCCESS:
			return { ...state, items: action.payload };
		case actions.UPDATE_CATEGORIES:
			return { ...state, categories: action.payload }
		default:
			return { ...state };
	}
}

export const ItemContext = React.createContext();

export const ItemContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const fetchCategory = (categoryId) => {
		const url = `http://localhost:8081/api/categories/${categoryId}`;
		axios.get(url)
			.catch(error => console.log(error))
			.then(({ data }) => {
				if(data && data.categories) {
					dispatch({
						type: actions.UPDATE_CATEGORIES,
						payload: data.categories
					})
				}
			});
	}

	const fetchItems = (query) => {
		const url = `http://localhost:8081/api/items?q=${query}`;
		axios.get(url)
			.catch(error => console.log(error))
			.then(({ data }) => {
				if(data && data.items) {
					dispatch({ type: actions.FETCH_ITEMS_SUCCESS, payload: data.items });
					fetchCategory(
						getMostRepeatedCategory(data.categories)
					);
				}
			})
	}

	return (
		<ItemContext.Provider value={{ state, dispatch, fetchItems }}>
			{children}
		</ItemContext.Provider>
	);
}
