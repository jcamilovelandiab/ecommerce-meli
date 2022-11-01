export const buildBreadcrumb = (categories) => {
	return categories.reduce((acc, category, index) => {
		if (index !== 0) acc += ' > ';
		return acc + category;
	}, '');
}

const itemConditionMap = {
	'new': 'Nuevo',
	'used': 'Usado',
	'not_specified': 'No especificado por el vendedor'
}

export const buildItemSubtitle = (item) => {
	if (item.condition === undefined || item.sold_quantity === undefined) return '';
	const condition = itemConditionMap[item.condition] || '';
	let subtitle = '';
	if(condition) subtitle += `${condition} - `
	subtitle += `${item.sold_quantity} vendido`;
	subtitle += (item.sold_quantity>1) ? 's' : '';
	return subtitle;
}


export const buildPriceDecimals = (item) => {
	if(item?.price?.decimals === undefined) return '';
	if(item.price.decimals < 9) {
		return String(item.price.decimals).padStart(2, '0');
	}
	return item.price.decimals;
}
