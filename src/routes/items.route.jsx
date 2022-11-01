import React from 'react';
import ItemsPage from '../pages/items/items';
import { ItemsContextProvider } from '../store/items.context';

const ItemsRoute = () => (
	<ItemsContextProvider>
		<ItemsPage />
	</ItemsContextProvider>
);

export default ItemsRoute;
