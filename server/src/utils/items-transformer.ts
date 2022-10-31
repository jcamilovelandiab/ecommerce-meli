import {
	QueryItemDetailsResponse as ApiQueryItemDetailsResponse,
	QueryItemsResponse as ApiQueryItemsResponse,
	Item as ApiItem
} from "../api/items.types";
import { Author, Item, ItemDetailsResponse, ItemsResponse } from "../entities/items-response";
import CategoryService from "../services/category-service";

type StringNumberMap = {
	[key: string]: number;
}

export default class ItemsTransformer {

	categoryService: CategoryService;

	constructor(categoryService: CategoryService) {
		this.categoryService = categoryService;
	}

	transformCommonItemProperties(itemResult: ApiItem): Item {
		const [amount, decimals] = itemResult.price.toString().split('.').map(Number);
		return {
			id: itemResult.id,
			title: itemResult.title,
			price: {
				amount,
				currency: itemResult.currency_id,
				decimals: decimals || 0
			},
			condition: itemResult.condition,
			free_shipping: itemResult.shipping.free_shipping,
			category_id: itemResult.category_id
		}
	}

	async transformItems(response: ApiQueryItemsResponse, author: Author): Promise<ItemsResponse> {
		const categories: string[] = [];
		const items: Item[] = response.results.map((result: ApiItem) => {
			categories.push(result.category_id);
			return {
				...(this.transformCommonItemProperties(result)),
				picture: result.thumbnail,
				location: result.address.state_name
			}
		});
		const categoryId = this.getMostRepeatedCategory(categories);
		const category = await this.categoryService.getCategoryById(categoryId);
		return ({
			author,
			categories: category.categories.map(c => c.name),
			items: items
		});
	}

	async transformItemDetails(itemDetails: ApiQueryItemDetailsResponse, author: Author): Promise<ItemDetailsResponse> {
		const category = await this.categoryService.getCategoryById(itemDetails.category_id);
		const item = {
			...(this.transformCommonItemProperties(itemDetails)),
			picture: itemDetails.pictures[0].url,
			sold_quantity: itemDetails.sold_quantity
		}
		return ({
			author,
			item,
			categories: category.categories.map(c => c.name)
		});
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
