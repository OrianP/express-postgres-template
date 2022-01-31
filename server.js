// require express server
const { request, response } = require("express");
const express = require("express");
const server = express();

// body parser middleware to parse request body
const bodyParser = express.urlencoded({ extended: false });
// use in all routes
server.use(bodyParser);

// add static handler to allow access to all files inside public
const staticHandler = express.static("public");
server.use(staticHandler);

// cookie parser
const cookieParser = require("cookie-parser");
server.use(cookieParser(process.env.COOKIE_SECRET));

// create home route with basic html template
server.get("/", (request, response) => {
	const html = `
    <!DOCTYPE html>
     <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="./style.css">
        <title>Document</title>
      </head>
      <body>
       <h1>hello world</h1>
      </body>
      </html>`;

	response.send(html);
});

// assign port to deployed or local port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});