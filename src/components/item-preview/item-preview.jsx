import React from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '../grid/grid';
import { NumericFormat } from 'react-number-format';
import shippingImg from '../../assets/images/ic_shipping.png';

import styles from './item-preview.module.scss';

const ItemPreview = ({ item }) => {

	const navigate = useNavigate();

	const onClick = () => {
		navigate(`${item.id}`);
	}

	return (
		<div className={styles.item_preview}>
			<Grid container>
				<Grid item cols={8} style={styles.item_preview_details} onClick={onClick}>
					<img src={item.picture} alt={item.title} className={styles.item_preview_image} />
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
