import React, { useContext, useEffect, useMemo } from 'react'

import { useSearchParams } from 'react-router-dom';
import ItemPreview from '../../components/item-preview/item-preview';
import Layout from '../../components/layout/layout';
import { ItemContext } from '../../store/item.context';

import styles from './items.module.scss';

const ItemsPage = () => {
	const { state: { items, categories }, fetchItems } = useContext(ItemContext);
	const [searchParams] = useSearchParams();
	const searchInput = searchParams.get('search');

	useEffect(() => {
		fetchItems(searchInput);
	}, [searchInput]);

	const breadCrumb = useMemo(() =>
		categories.reduce((acc, category, index) => {
			if (index !== 0) acc += ' > ';
			return acc + category.name;
		}, '')
	, [categories]);

	return (
		<div>
			<Layout>
				<div className={styles.items_breadcrumb}>
					{ breadCrumb }
				</div>
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

