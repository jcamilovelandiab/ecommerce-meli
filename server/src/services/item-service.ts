import { Author, Item, ItemDetailsResponse, ItemsResponse } from '../entities/items-response';
import { QueryItemDescriptionResponse, QueryItemDetailsResponse, QueryItemsResponse } from '../api/items.types';
import ItemTransformer from '../utils/item-transformer';
import CategoryProxy from '../proxy/category-proxy';
import ItemProxy from '../proxy/item-proxy';
import ItemCategoryBuilder from '../utils/item-category-buider';
import { QueryCategoryResponse } from '../api/categories.types';

export default class ItemService {

	private itemProxy: ItemProxy;
	private categoryProxy: CategoryProxy;
	private transformer: ItemTransformer;
	private itemCategoryBuilder: ItemCategoryBuilder;
	private author: Author = { name: 'Juan Camilo', lastname: 'Velandia Botello' }; // this can be a config

	constructor(
		itemProxy: ItemProxy,
		categoryProxy: CategoryProxy,
		itemTransformer: ItemTransformer,
		itemCategoryBuilder: ItemCategoryBuilder
	) {
		this.itemProxy = itemProxy;
		this.categoryProxy = categoryProxy;
		this.transformer = itemTransformer;
		this.itemCategoryBuilder = itemCategoryBuilder;
	}

	async getItemsByQuery(query: string): Promise<ItemsResponse> {
		const items: QueryItemsResponse = await this.itemProxy.getItemsByQuery(query);
		const transformedItems: Item[] = this.transformer.transformItems(items);
		const categoryId = this.itemCategoryBuilder.buildCategoryFromItems(transformedItems);
		const category: QueryCategoryResponse = await this.categoryProxy.getCategoryById(categoryId);
		return {
			categories: category.path_from_root.map(c => c.name),
			author: this.author,
			items: transformedItems
		};
	}

	async getItemById(itemId: string): Promise<ItemDetailsResponse> {
		const itemDetails: QueryItemDetailsResponse = await this.itemProxy.getItemById(itemId);
		const transformedItemDetails: Item = this.transformer.transformItemDetails(itemDetails);
		const itemDescription: QueryItemDescriptionResponse = await this.itemProxy.getItemDescriptionById(itemId);
		const category: QueryCategoryResponse = await this.categoryProxy.getCategoryById(itemDetails.category_id);
		return {
			categories: category.path_from_root.map(c => c.name),
			author: this.author,
			item: {
				...(transformedItemDetails),
				description: itemDescription.plain_text
			}
		}
	}


}
