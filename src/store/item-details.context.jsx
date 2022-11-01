import React, { useReducer } from "react";
import axios from "axios";

const INITIAL_STATE = {
	itemDetails: {
		categories: [],
		item: {}
	},
	error: null,
	loading: false
}

const actions = {
	FETCH_ITEM_DETAILS_START: 'FETCH_ITEM_DETAILS_START',
	FETCH_ITEM_DETAILS_SUCESS: 'FETCH_ITEM_DETAILS_SUCESS',
	FETCH_ITEM_DETAILS_ERROR: 'FETCH_ITEM_DETAILS_ERROR'
}

const reducer = (state, action) => {
	switch (action.type) {
		case actions.FETCH_ITEM_DETAILS_START:
			return { ...state, loading: true }
		case actions.FETCH_ITEM_DETAILS_ERROR:
			return { ...state, loading: false, error: action.payload };
		case actions.FETCH_ITEM_DETAILS_SUCESS:
			return {
				...state,
				loading: false,
				error: null,
				itemDetails: action.payload
			};
		default:
			return { ...state };
	}
}

export const ItemDetailsContext = React.createContext();

export const ItemDetailsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const fetchItemDetails = (itemId) => {
		const url = `http://localhost:8081/api/items/${itemId}`;
		dispatch({ type: actions.FETCH_ITEM_DETAILS_START })
		axios.get(url).catch(error =>
			dispatch({ type: actions.FETCH_ITEM_DETAILS_ERROR, payload: error })
		).then(({ data }) => {
			if (data && data.item) {
				dispatch({
					type: actions.FETCH_ITEM_DETAILS_SUCESS,
					payload: {
						categories: data.categories,
						item: data.item
					}
				})
			}
		});
	}

	return (
		<ItemDetailsContext.Provider value={{ state, fetchItemDetails }}>
			{children}
		</ItemDetailsContext.Provider>
	);
}
