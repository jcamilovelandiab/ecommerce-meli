import React, { useContext, useEffect } from 'react'

import { useSearchParams } from 'react-router-dom';
import ItemPreview from '../../components/item-preview/item-preview';
import Layout from '../../components/layout/layout';
import { ItemContext } from '../../store/ItemContext';

import styles from './items.module.scss';

const ItemsPage = () => {
	const { state: { items }, fetchItems } = useContext(ItemContext);
	const [searchParams] = useSearchParams();
	const searchInput = searchParams.get('search');

	useEffect(() => {
		fetchItems(searchInput);
	}, [searchInput]);

	return (
		<div>
			<Layout>
				<ol className={styles.items_container}>
					{
						items.map( item => (
							<li key={item.id} className={styles.items_border}>
								<ItemPreview item={item} />
							</li>
						))
					}
				</ol>
			</Layout>
		</div>
	)
};

export default ItemsPage;

