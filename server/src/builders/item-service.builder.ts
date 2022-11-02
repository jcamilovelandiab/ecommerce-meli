import CategoryProxy from "../proxy/category-proxy";
import ItemProxy from "../proxy/item-proxy";
import ItemService from "../services/item-service";
import ItemCategoryBuilder from "../utils/item-category-buider";
import ItemTransformer from "../utils/item-transformer";

export default class ItemServiceBuilder {

	private static instance: ItemServiceBuilder;

	private constructor() {}

	public static getInstance(): ItemServiceBuilder {
		if (!ItemServiceBuilder.instance) {
			ItemServiceBuilder.instance = new ItemServiceBuilder();
		}
		return ItemServiceBuilder.instance;
	}

	build() {
		return new ItemService(
			new ItemProxy(),
			new CategoryProxy(),
			new ItemTransformer(),
			new ItemCategoryBuilder()
		)
	}

}
