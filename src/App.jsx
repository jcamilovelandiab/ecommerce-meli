import React from 'react';
import HomePage from './pages/home';
import Header from './components/header/header';

const App = () => {
  return (
		<>
			<Header />
			<main>
				<HomePage />
			</main>
		</>
	)
}

export default App;
