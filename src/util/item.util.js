export const buildBreadcrumb = (categories) => {
	return categories.reduce((acc, category, index) => {
		if (index !== 0) acc += ' > ';
		return acc + category;
	}, '');
}
