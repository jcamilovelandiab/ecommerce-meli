import axios from 'axios';
import { QueryItemDescriptionResponse, QueryItemDetailsResponse, QueryItemsResponse } from '../api/items.types';
import Proxy from './proxy';

export default class ItemProxy extends Proxy {

	private defaultLocation: string = 'MLA'; // Argentina

	async getItemsByQuery(query: string, limit: number = 4, site?: string): Promise<QueryItemsResponse> {
		const url: string = `${this.apiBaseUrl}/sites/${site || this.defaultLocation}`
			+ `/search?q=${query}&limit=${limit}`;
		return (await axios.get(url)).data;
	}

	async getItemById(itemId: string): Promise<QueryItemDetailsResponse> {
		const url: string = `${this.apiBaseUrl}/items/${itemId}`;
		return (await axios.get(url)).data;
	}

	async getItemDescriptionById(itemId: string): Promise<QueryItemDescriptionResponse> {
		const url: string = `${this.apiBaseUrl}/items/${itemId}/description`;
		return (await axios.get(url)).data;
	}

}
