import axios from 'axios';
import { Author, ItemsResponse } from '../entities/items-response';
import { QueryItemsResponse } from '../api/items.types';
import ItemsTransformer from '../utils/itemsTransformer';
import Service from './service';

export default class ItemService extends Service {

	transformer: ItemsTransformer;

	constructor() {
		super();
		this.transformer = new ItemsTransformer();
	}

	async getItemsByQuery(query: string, limit: number = 10, site?: string): Promise<ItemsResponse> {
		const url: string = `${this.apiBaseUrl}/sites/${site || this.defaultLocation}`
			+ `/search?q=${query}&limit=${limit}`;
		const response: QueryItemsResponse = await (await axios.get(url)).data;
		return this.transformer.transformItems(response, this.author);
	}

}
