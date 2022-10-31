import React, { useReducer } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
	items: {
		categories: [],
		list: []
	}
};

const actions = {
	FETCH_ITEMS_SUCCESS: 'FETCH_ITEMS_SUCCESS'
}

const reducer = (state, action) => {
	switch (action.type) {
		case actions.FETCH_ITEMS_SUCCESS:
			return { ...state, items: action.payload };
		default:
			return { ...state };
	}
}

export const ItemContext = React.createContext();

export const ItemContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const fetchItems = (query) => {
		const url = `http://localhost:8081/api/items?q=${query}`;
		axios.get(url)
			.catch(error => console.log(error))
			.then(({ data }) => {
				if(data && data.items) {
					dispatch({
						type: actions.FETCH_ITEMS_SUCCESS,
						payload: {
							categories: data.categories,
							list:	data.items
						}
					});
				}
			})
	}

	return (
		<ItemContext.Provider value={{ state, dispatch, fetchItems }}>
			{children}
		</ItemContext.Provider>
	);
}
