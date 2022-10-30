import { Request, Response } from "express";

var express = require("express");

var app = express();

app.get('/api/items', function (req: Request, res: Response) {
	const q = req.query.q;
	if(!q) {
		res.status(400).send('The q parameter must be provided!');
	}
	res.send(`Filtering items with q: ${q}`);
});

app.get('/api/items/:itemId', function (req: Request, res: Response) {
	const itemId = req.params.itemId;
	console.log(itemId);
	res.send(`Get item by id: ${req.params.itemId}`);
});

app.listen(8081, () => {
	console.info("Server running on port 8081");
});
