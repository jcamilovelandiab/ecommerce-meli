import { Item } from "../entities/items-response";

type StringNumberMap = {
	[key: string]: number;
}

export default class ItemCategoryBuilder {

	buildCategoryFromItems(items: Item[]) {
		return this.getMostRepeatedCategory(
			items.map(item => item.category_id)
		)
	}

	private getMostRepeatedCategory(categories: string[]) {
		let maxNumber = 0;
		let result = '';
		categories.reduce((map, category) => {
			if (map[category] === undefined) {
				map[category] = 0;
			}
			map[category] += 1;
			if (map[category] > maxNumber) {
				maxNumber = map[category];
				result = category;
			}
			return map
		}, {} as StringNumberMap);
		return result;
	}

}
