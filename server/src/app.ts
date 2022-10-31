import express from "express";
import { Request, Response } from "express";
import { CategoriesResponse } from "./entities/categories-response";
import { ItemDetailsResponse, ItemsResponse } from "./entities/items-response";
import CategoryService from "./services/category-service";
import ItemService from "./services/item-service";

var app = express();

app.use(function (_: Request, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	next();
});

app.get('/api/items', async function (req: Request, res: Response) {
	const q: string = (req.query.q || '') as string;
	if(q === '') {
		res.status(400).send('The q parameter must be provided!');
	}
	const items: ItemsResponse = await new ItemService().getItemsByQuery(q);
	res.send(items);
});

app.get('/api/items/:itemId', async function (req: Request, res: Response) {
	const itemId = req.params.itemId;
	const itemDetails: ItemDetailsResponse = await new ItemService().getItemById(itemId);
	res.send(itemDetails);
});

app.get('/api/categories/:categoryId', async function (req: Request, res: Response) {
	const categoryId = req.params.categoryId;
	const category: CategoriesResponse = await new CategoryService().getCategoryById(categoryId);
	res.send(category);
});

app.listen(8081, () => {
	console.info("Server running on port 8081");
});
