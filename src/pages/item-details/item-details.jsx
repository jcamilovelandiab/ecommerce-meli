import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './item-details.module.scss';

import Layout from '../../components/layout/layout';

const ItemDetailsPage = () => {

	const { id } = useParams();

	return (
		<div>
			<Layout>
				<div className={styles.item_details_breadcrumb}>
					{id}
				</div>
			</Layout>
		</div>
	);
}

export default ItemDetailsPage;
