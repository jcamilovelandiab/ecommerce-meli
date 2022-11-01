import React from 'react';
import ItemDetailsPage from '../pages/item-details/item-details';
import { ItemDetailsContextProvider } from '../store/item-details.context';

const ItemDetailsRoute = () => (
	<ItemDetailsContextProvider>
		<ItemDetailsPage />
	</ItemDetailsContextProvider>
);

export default ItemDetailsRoute;
