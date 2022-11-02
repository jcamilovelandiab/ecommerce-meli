import axios from 'axios';

import { QueryCategoryResponse } from "../api/categories.types";
import Proxy from "./proxy";

export default class CategoryProxy extends Proxy {

	async getCategoryById(categoryId: string): Promise<QueryCategoryResponse> {
		const url = `${this.apiBaseUrl}/categories/${categoryId}`;
		return (await (axios.get(url))).data;
	}

}
