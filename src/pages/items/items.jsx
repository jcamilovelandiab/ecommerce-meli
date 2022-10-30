import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';


const ItemsPage = () => {
	const [searchParams] = useSearchParams();
	const searchInput = searchParams.get('search');

	useEffect(() => {

	}, [searchInput]);

	return (
		<div>
			<Layout>
				Items page
			</Layout>
		</div>
	)
};

export default ItemsPage;

