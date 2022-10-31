import axios from 'axios';
import { QueryCategoryResponse } from '../api/categories.types';
import { CategoriesResponse } from '../entities/categories-response';
import Service from './service';

export default class CategoryService extends Service {

	constructor(){
		super();
	}

	async getCategoryById(categoryId: string): Promise<CategoriesResponse> {
		const url = `${this.apiBaseUrl}/categories/${categoryId}`;
		const result: QueryCategoryResponse = await (await (axios.get(url))).data;
		return {
			id: result.id,
			name: result.name,
			categories: result.path_from_root.map(category => ({
				id: category.id,
				name: category.name
			}))
		}
	}

}
