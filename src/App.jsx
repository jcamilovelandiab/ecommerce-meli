import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './pages/navigation/navigation';
import ItemsPage from './pages/items/items';
import ItemDetailsPage from './pages/item-details/item-details';
import { ItemsContextProvider } from './store/items.context';
import { ItemDetailsContextProvider } from './store/item-details.context';

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route path='items/*' element={
						<Routes>
							<Route
								index
								element={
									<ItemsContextProvider>
										<ItemsPage />
									</ItemsContextProvider>
								}
							/>
							<Route
								path=':id'
								element={
									<ItemDetailsContextProvider>
										<ItemDetailsPage />
									</ItemDetailsContextProvider>
								}
							/>
						</Routes>
					} />
				</Route>
			</Routes>
		</>
	)
}

export default App;
