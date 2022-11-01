import React, { useContext, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

import styles from './item-details.module.scss';

import Layout from '../../components/layout/layout';
import { ItemDetailsContext } from '../../store/item-details.context';
import { buildBreadcrumb, buildItemSubtitle, buildPriceDecimals } from '../../util/item.util';
import Grid from '../../components/grid/grid';
import SEO from '../../components/seo/seo';

const TitlePage = `Ecommerce Meli - Buy Product`;
const TitleDescription = `Buy the product you have always desired!`;

const ItemDetailsPage = () => {
	const { state: { itemDetails }, fetchItemDetails } = useContext(ItemDetailsContext);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			fetchItemDetails(id);
		} else {
			navigate('/', { replace: true })
		}
	}, [id]);

	const breadCrumb = useMemo(() => buildBreadcrumb(itemDetails.categories), [itemDetails.categories]);
	const subtitle = useMemo(() => buildItemSubtitle(itemDetails.item), [itemDetails.item]);
	const priceDecimals = useMemo(() => buildPriceDecimals(itemDetails.item), [itemDetails.item]);

	return (
		<div className={styles.item_details}>
			{
				(itemDetails) ? (
					<Layout>
						<div className={styles.item_details_breadcrumb}>
							{breadCrumb}
						</div>
						<div className={styles.item_details_container}>
							<Grid container>
								<Grid item cols={8} style={{ display: 'flex' }}>
									<div className={styles.item_details_image_container}>
										<img
											src={itemDetails.item.picture}
											alt={'item'}
											className={styles.item_details_image}
										/>
									</div>
								</Grid>
								<Grid item cols={4}>
									<div className={styles.item_details_right_column}>
										<div className={styles.item_details_subtitle}>
											{subtitle}
										</div>
										<div className={styles.item_details_title}>
											<b>
												{(itemDetails?.item?.title || '')}
											</b>
										</div>
										<b>
											<div className={styles.item_details_price_container}>
												<NumericFormat
													className={styles.item_details_price}
													value={itemDetails?.item?.price?.amount}
													displayType={'text'}
													thousandSeparator={'.'}
													decimalSeparator={','}
													prefix={'$'}
												/>
												<div className={styles.item_details_decimals}>
													{priceDecimals}
												</div>
											</div>
										</b>
										<button className={styles.item_details_buy_button}>
											Comprar
										</button>
									</div>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item cols={8}>
									<div className={styles.item_details_description}>
										<div className={styles.item_details_description_title}>
											Descripción del Producto
										</div>
										<div className={styles.item_details_description_text}>
											{(itemDetails?.item?.description) || ''}
										</div>
									</div>
								</Grid>
							</Grid>
						</div>
						<SEO
							title={TitlePage}
							description={`${TitleDescription} / ${itemDetails.item.title}`}
						/>
					</Layout>
				) : <></>
			}
		</div>
	);
}

export default ItemDetailsPage;
