import axios from 'axios';
import { Author, ItemsResponse } from '../entities/items-response';
import { QueryItemDescriptionResponse, QueryItemDetailsResponse, QueryItemsResponse } from '../api/items.types';
import ItemsTransformer from '../utils/items-transformer';
import Service from './service';
import CategoryService from './category-service';

export default class ItemService extends Service {

	transformer: ItemsTransformer;
	categoryService: CategoryService;

	constructor() {
		super();
		this.transformer = new ItemsTransformer();
		this.categoryService = new CategoryService();
	}

	async getItemsByQuery(query: string, limit: number = 10, site?: string): Promise<ItemsResponse> {
		const url: string = `${this.apiBaseUrl}/sites/${site || this.defaultLocation}`
			+ `/search?q=${query}&limit=${limit}`;
		const response: QueryItemsResponse = (await axios.get(url)).data;
		return this.transformer.transformItems(response, this.author);
	}

	async getItemById(itemId: string) {
		const url: string = `${this.apiBaseUrl}/items/${itemId}`;
		const response: QueryItemDetailsResponse = (await axios.get(url)).data;
		const transformedItemDetails = this.transformer.transformItemDetails(response, this.author);
		const itemDescription = await this.getItemDescriptionById(itemId);
		const category = await this.categoryService.getCategoryById(transformedItemDetails.item.category_id);
		return {
			...transformedItemDetails,
			categories: category.categories.map( c => c.name),
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
