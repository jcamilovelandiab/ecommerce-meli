import axios from 'axios';
import { Author, ItemsResponse } from '../entities/items-response';
import { QueryItemDescriptionResponse, QueryItemDetailsResponse, QueryItemsResponse } from '../api/items.types';
import ItemsTransformer from '../utils/items-transformer';
import Service from './service';
import CategoryService from './category-service';

export default class ItemService extends Service {

	transformer: ItemsTransformer;

	constructor() {
		super();
		this.transformer = new ItemsTransformer(
			new CategoryService()
		);
	}

	async getItemsByQuery(query: string, limit: number = 4, site?: string): Promise<ItemsResponse> {
		const url: string = `${this.apiBaseUrl}/sites/${site || this.defaultLocation}`
			+ `/search?q=${query}&limit=${limit}`;
		const response: QueryItemsResponse = (await axios.get(url)).data;
		return await this.transformer.transformItems(response, this.author);
	}

	async getItemById(itemId: string) {
		const url: string = `${this.apiBaseUrl}/items/${itemId}`;
		const response: QueryItemDetailsResponse = (await axios.get(url)).data;
		const transformedItemDetails = await this.transformer.transformItemDetails(response, this.author);
		const itemDescription = await this.getItemDescriptionById(itemId);
		return {
			...transformedItemDetails,
			item: {
				...(transformedItemDetails.item),
				description: itemDescription
			}
		}
	}

	async getItemDescriptionById(itemId: string): Promise<string> {
		const url: string = `${this.apiBaseUrl}/items/${itemId}/description`;
		const response: QueryItemDescriptionResponse  = (await axios.get(url)).data;
		return response.plain_text;
	}

}
