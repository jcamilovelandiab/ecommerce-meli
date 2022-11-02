import {
	QueryItemDetailsResponse as ApiQueryItemDetailsResponse,
	QueryItemsResponse as ApiQueryItemsResponse,
	Item as ApiItem
} from "../api/items.types";
import { Item } from "../entities/items-response";

export default class ItemTransformer {

	transformItems(response: ApiQueryItemsResponse): Item[] {
		const categories: string[] = [];
		const items: Item[] = response.results.map((result: ApiItem) => {
			categories.push(result.category_id);
			return {
				...(this.transformCommonItemProperties(result)),
				picture: result.thumbnail,
				location: result.address.state_name
			}
		});
		return items;
	}

	transformItemDetails(itemDetails: ApiQueryItemDetailsResponse): Item {
		const item: Item = {
			...(this.transformCommonItemProperties(itemDetails)),
			picture: itemDetails.pictures[0].url,
			sold_quantity: itemDetails.sold_quantity
		}
		return item;
	}

	private transformCommonItemProperties(itemResult: ApiItem): Item {
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

}
