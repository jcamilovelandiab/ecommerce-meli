import React, { useContext, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';

import ItemPreview from '../../components/item-preview/item-preview';
import Layout from '../../components/layout/layout';
import { ItemsContext } from '../../store/items.context';
import { buildBreadcrumb } from '../../util/item.util';

import styles from './items.module.scss';

const ItemsPage = () => {
	const navigate = useNavigate();
	const { state: { items }, fetchItems } = useContext(ItemsContext);
	const [searchParams] = useSearchParams();
	const searchInput = searchParams.get('search');

	useEffect(() => {
		if(searchInput) {
			fetchItems(searchInput);
		} else {
			navigate('/', { replace: true });
		}
	}, [searchInput]);

	const breadCrumb = useMemo(() => buildBreadcrumb(items.categories), [items.categories]);

	return (
		<div className={styles.items}>
			<Layout>
				<div className={styles.items_breadcrumb}>
					{ breadCrumb }
				</div>
				<ol className={styles.items_container}>
					{
						items.list.map( item => (
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

