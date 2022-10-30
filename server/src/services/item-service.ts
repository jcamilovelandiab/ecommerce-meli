import axios from 'axios';
import { Author, Item, ItemsResponse } from '../entities/items-response';
import { FilteredItemsResponse, Result } from '../api/api.types';

export default class ItemService {

	apiBaseUrl: string = 'https://api.mercadolibre.com';
	defaultLocation: string = 'MCO'; // Colombia
	author: Author = { name: 'Juan Camilo', lastname: 'Velandia Botello' };

	async getItemsByQuery(query: string, limit: number = 4, site?: string): Promise<ItemsResponse> {
		const url: string = `${this.apiBaseUrl}/sites/${site || this.defaultLocation}`
			+ `/search?q=${query}&limit=${limit}`;
		const response: FilteredItemsResponse = await (await axios.get(url)).data;
		const categories: string[] = [];
		const items: Item[] = response.results.map((result: Result) => {
			categories.push(result.category_id);
			return {
				id: result.id,
				title: result.title,
				price: {
					amount: result.price,
					currency: result.currency_id
				},
				condition: result.condition,
				free_shipping: result.shipping.free_shipping,
				picture: result.thumbnail,
			}
		});
		return {
			author: this.author,
			categories,
			items: items
		};
	}

}
