import express from "express";
import { Request, Response } from "express";
import ItemServiceBuilder from "./builders/item-service.builder";
import { ItemDetailsResponse, ItemsResponse } from "./entities/items-response";

var app = express();

app.use(function (_: Request, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	next();
});

var itemServiceBuilder = ItemServiceBuilder.getInstance();
var itemService = itemServiceBuilder.build();

app.get('/api/items', async function (req: Request, res: Response) {
	const q: string = (req.query.q || '') as string;
	if(q === '') {
		res.status(400).send('The q parameter must be provided!');
	}
	const items: ItemsResponse = await itemService.getItemsByQuery(q);
	res.send(items);
});

app.get('/api/items/:itemId', async function (req: Request, res: Response) {
	const itemId = req.params.itemId;
	const itemDetails: ItemDetailsResponse = await itemService.getItemById(itemId);
	res.send(itemDetails);
});

app.listen(8081, () => {
	console.info("Server running on port 8081");
});
