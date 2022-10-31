export interface Category {
	id: string;
	name: string;
}

export interface CategoriesResponse {
	id: string;
	name: string;
	categories: Category[];
}
