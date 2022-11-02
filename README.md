# Ecommerce Meli

In order to run this project, we need to install the server and client dependencies first.

## Available Scripts for Server

Go to the server folder and run the following commands:

### `npm install`

Install the npm dependencies `npm install`

### `npm run start`

Start the server

Open [http://localhost:8081/api/items?q=apple](http://localhost:8081/api/items?q=apple) to view it in the browser.

## Available Scripts for Client

We can run the following commands:

### `npm install`

Install the npm dependencies `npm install`

### `npm run start`

Runs the app in the development mode locally.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

Endpoints:
 - items: http://localhost:8081/api/items?q= receives the q parameter
   - Example: http://localhost:8081/api/items?q=Apple%20ipod
 - item details: http://localhost:8081/api/items/:itemId.
   - Example: http://localhost:8081/api/items/MLA606000193

### `npm run build`

Builds the app for production to the `dist` folder.

The build is minified and the filenames include the hashes.

## Server architecture

![Server architecture](https://github.com/jcamilovelandiab/ecommerce-meli/blob/main/server/server-architecture.png)
