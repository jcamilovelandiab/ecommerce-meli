import React from 'react';
import Grid from '../grid/grid';

import styles from './item-preview.module.scss';

const ItemPreview = ({ item }) => {
	return (
		<div className={styles.item_preview}>
			<Grid container>
				<Grid item cols={8} style={styles.item_preview_details}>
					<img src={item.picture} alt={item.title} className={styles.item_preview_image} />
					<div className={styles.item_preview_description}>
						<div className={styles.item_preview_description_amount}>
							<p>{item.price.amount}</p>
						</div>
						<div className={styles.item_preview_description_title}>
							{item.title}
						</div>
					</div>
				</Grid>
				<Grid item cols={2}>
					<p className={styles.item_preview_location}>{item.location}</p>
				</Grid>
			</Grid>
		</div>
	);
}

export default ItemPreview;
