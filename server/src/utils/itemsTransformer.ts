import {
	QueryItemsResponse as ApiQueryItemsResponse,
	Result as ApiResult
} from "../api/items.types";
import { Author, Item, ItemsResponse } from "../entities/items-response";

export default class ItemsTransformer {

	transformItems(response: ApiQueryItemsResponse, author: Author): ItemsResponse {
		const categories: string[] = [];
		const items: Item[] = response.results.map((result: ApiResult) => {
			categories.push(result.category_id);
			const [amount, decimals] = result.price.toString().split('.').map(Number);
			return {
				id: result.id,
				title: result.title,
				price: {
					amount,
					currency: result.currency_id,
					decimals: decimals || 0
				},
				condition: result.condition,
				free_shipping: result.shipping.free_shipping,
				picture: result.thumbnail,
				location: result.address.state_name
			}
		});
		return ({
			author,
			categories,
			items: items
		});
	}

}
