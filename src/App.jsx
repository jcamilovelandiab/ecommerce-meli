import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './pages/navigation/navigation';
import ItemsPage from './pages/items/items';
import ItemDetailsPage from './pages/item-details/item-details';
import { ItemContextProvider } from './store/item.context';

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route path='items/*' element={
						<ItemContextProvider>
							<Routes>
								<Route index element={<ItemsPage />} />
								<Route path=':id' element={<ItemDetailsPage />} />
							</Routes>
						</ItemContextProvider>
					} />
				</Route>
			</Routes>
		</>
	)
}

export default App;
