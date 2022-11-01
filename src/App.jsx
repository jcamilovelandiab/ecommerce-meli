import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Navigation = lazy(() => import('./pages/navigation/navigation'));
const ItemDetailsRoute = lazy(() => import('./routes/item-details.route'));
const ItemsRoute = lazy(() => import('./routes/items.route'));

const App = () => {
	return (
		<Suspense>
			<Routes>
				<Route path='/' element={<Navigation />}>
					<Route path='items/*' element={
						<Routes>
							<Route
								index
								element={<ItemsRoute />}
							/>
							<Route
								path=':id'
								element={<ItemDetailsRoute />}
							/>
						</Routes>
					} />
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App;
