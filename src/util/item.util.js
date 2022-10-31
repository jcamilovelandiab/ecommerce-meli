export const getMostRepeatedCategory = (categories) => {
	let maxNumber = 0;
	let result = '';
	const categoryMap = categories.reduce((map, category) => {
		if(map[category] === undefined) {
			map[category] = 0;
		}
		map[category]+=1;
		if(map[category] > maxNumber) {
			maxNumber = map[category];
			result = category;
		}
		return map
	}, {});
	return result;
}

export const buildBreadcrumb = (categories) => {
	return categories.reduce((acc, category, index) => {
		if (index !== 0) acc += ' > ';
		return acc + category.name;
	}, '');
}
