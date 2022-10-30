import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/home/home';
import Header from './pages/navigation/navigation';
import ItemsPage from './pages/items/items';
import ItemDetailsPage from './pages/item-details/item-details';

const App = () => {
  return (
		<>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route path='items/*' element={
						<Routes>
							<Route index element={<ItemsPage />} />
							<Route path=':id' element={<ItemDetailsPage />} />
						</Routes>
					}/>
				</Route>
			</Routes>
		</>
	)
}

export default App;
