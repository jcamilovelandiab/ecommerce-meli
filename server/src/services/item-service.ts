import axios from 'axios';
import { Author, ItemsResponse } from '../entities/items-response';
import { QueryItemsResponse, Result } from '../api/api.types';
import ItemsTransformer from '../utils/itemsTransformer';

export default class ItemService {

	apiBaseUrl: string = 'https://api.mercadolibre.com';
	defaultLocation: string = 'MLA'; // Argentina
	author: Author = { name: 'Juan Camilo', lastname: 'Velandia Botello' };
	transformer: ItemsTransformer;

	constructor() {
		this.transformer = new ItemsTransformer();
	}

	async getItemsByQuery(query: string, limit: number = 10, site?: string): Promise<ItemsResponse> {
		const url: string = `${this.apiBaseUrl}/sites/${site || this.defaultLocation}`
			+ `/search?q=${query}&limit=${limit}`;
		const response: QueryItemsResponse = await (await axios.get(url)).data;
		return this.transformer.transformItems(response, this.author);
	}

}
