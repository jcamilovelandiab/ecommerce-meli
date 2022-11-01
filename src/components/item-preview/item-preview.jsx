import React from 'react';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

import Grid from '../grid/grid';
import shippingImg from '../../assets/images/ic_shipping.png';

import styles from './item-preview.module.scss';

const ItemPreview = ({ item }) => {

	return (
		<div className={styles.item_preview}>
			<Grid container>
				<Grid item cols={8} style={styles.item_preview_details}>
					<Link to={`${item.id}`}>
						<img src={item.picture} alt={item.title} className={styles.item_preview_image} />
					</Link>
					<div className={styles.item_preview_description}>
						<div className={styles.item_preview_description_amount}>
							<NumericFormat
								value={item.price.amount}
								displayType={'text'}
								thousandSeparator={'.'}
								decimalSeparator={','}
								prefix={'$'}
							/>
							{
								(item.free_shipping) && (
									<img
										className={styles.item_preview_description_shipping}
										src={shippingImg}
										alt='free-shipping'
									/>
								)
							}
						</div>
						<Link to={`${item.id}`}>
							<div className={styles.item_preview_description_title}>
								{item.title}
							</div>
						</Link>
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
