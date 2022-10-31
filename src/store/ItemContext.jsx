import React, { useReducer } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
	items: [],
	breadcrumb: ''
};

const actions = {
	FETCH_ITEMS_SUCCESS: 'FETCH_ITEMS_SUCCESS',
	UPDATE_BREADCRUMB: 'UPDATE_BREADCRUMB'
}

const reducer = (state, action) => {
	switch (action.type) {
		case actions.FETCH_ITEMS_SUCCESS:
			return { ...state, items: action.payload };
		case actions.UPDATE_BREADCRUMB:
			return { ...state, breadcrumb: action.payload }
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
					dispatch({ type: actions.FETCH_ITEMS_SUCCESS, payload: data.items });
				}
			})
	}

	return (
		<ItemContext.Provider value={{ state, dispatch, fetchItems }}>
			{children}
		</ItemContext.Provider>
	);
}
