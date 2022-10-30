import React from 'react';
import { useSearchParams } from 'react-router-dom';


const ItemsPage = () => {
	const [searchParams] = useSearchParams();
	console.log(searchParams.get('search'));

	return (
		<div>
			Items Page
		</div>
	)
};

export default ItemsPage;

