# Express-Postgres Project Template

A project setup template with express server, postgres database and cypress testing.  
This guide is based on [Founders and Coders](https://learn.foundersandcoders.com/) curriculum.

## Project setup guide

Before you begin, make sure you [install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)!

Here are the steps I followed to create this project template:

- Create a new repo on GitHub
- Clone to your local machine
- Add a `.gitignore` file (I added this when I created the repo on GitHub and deleted any irrelevant template content)

## In your terminal

- Initialise the project to create a package.json  
   `npm init -y`

### Server

- Install the Express server library  
   `npm install express`
- Install nodemon. This is a helper that auto-restarts your server when you save changes  
   `npm install nodemon`

### Tests

- Install Cypress for testing  
   `npm install -D cypress`
- Once Cypress is installed, open your `package.json` and edit the `"test"` script:

```
{
  "scripts": {
    "test": "cypress open"
  }
}
```

- Run the test script you just edited. This will create a cypress folder in your root directory  
   `npm run test`
   
- Delete any unwanted auto-generated folders (i.e `integration/1-getting-started`) (optional)

```
cd cypress/integration
rm -r <folder-name>
```

- Create a file for writing your tests inside `cypress/integration/`
    `touch test.js`
    
- Configure your `baseUrl` property in the `cypress.json` file inside your root directory. This will allow you to simply use `cy.visit("/")` in cypress tests to visit the home route instead of specifying the localhost url in every test
```
{
    "baseUrl": "http://localhost:3000"
}
```
- Add basic starter tests to your `test.js` file

```
// Wrap tests in a describe to run together

describe("homepage tests", () => {
  it("can find homepage", () => {
    cy.visit("/");
  });

  it("can find title on home page", () => {
    cy.visit("/");
    cy.get("h1").contains("hello world");
  });
});
```

Run `npm run test` when you want to run your tests

### Database

- Install [node-postgres](https://node-postgres.com/) library (a collection of node.js modules for interfacing with your PostgreSQL database).  
    `npm install pg`
- Install the [dotenv](https://www.npmjs.com/package/dotenv) library  
    `npm install dotenv`
    
## Create and populate database:

- Create a `scripts` folder in your root directory
- Follow the steps in this [example repo](https://github.com/oliverjam/express-postgres-example) by [oliverjam](https://github.com/oliverjam) for writing script files that will create and populate your database
- Remember to change the permissions on each of your script files in your terminal to make them executable  
   ```
   chmod +x ./scripts/your-filename
   ```
- Create your local database by running the create_db script with the name you want to give your database

    ```
    ./scripts/create_db <your-db-name>
    ```

    This will create a user, database and .env file containing the DATABASE_URL environment variable

 - Create a `database` folder in your root directory and create `connection.js` and `init.sql` files witihn it

    ```
    mkdir database
    cd database
    touch connection.js init.sql
    ```

- Add the following code inside `connection.js`. See comments in `connection.js` of this repo for explanation

    ```
    const pg = require("pg");

    if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
    }

    const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    });

    module.exports = db;
    ```

 - Create a database table and insert some example data into it inside your `init.sql` i.e:

    ```
    BEGIN;

    -- Remove existing tables and repopulate db when script runs
    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    );

    INSERT INTO users (name, email) VALUES (
        'Grace Hopper',
        'gracehopper@gmail.com'
    );

    COMMIT;
    ```

 - Run the script to populate your database

    ```
    ./scripts/populate_db
    ```

  - Check that your database has been populated by connecting and retrieving data from it in psql

    ```
    psql
    \list
    \connect <your-db-name>
    \ SELECT * FROM <your-db-table-name>
    ```
    
### Back to the server for some basic code setup! 

- Create a `server.js` file in your root directory

```
touch server.js
```

- Add basic server code in your `server.js` file

```
// require express server
const { request, response } = require("express");
const express = require("express");
const server = express();

// Body parser middleware to parse request body
const bodyParser = express.urlencoded({ extended: false });

// use parser in all routes
server.use(bodyParser);

// create home route with basic html template
server.get("/", (request, response) => {
	const html = `
    <!DOCTYPE html>
     <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

```

- Add a `dev` command to your script in `package.json`. This tells Node to use the dotenv library to load env vars before our server starts.

```
{
  "scripts": {
    "dev": "nodemon -r dotenv/config server.js"
  }
}
```

- Run the dev command to start the server

```
npm run dev
```

🥳 **Mission accomplished!** 🥳

### Extra bits...

#### CSS file

Add `public` folder in root directory and create `style.css` file inside it

```
mkdir public
touch public/style.css
```

Add this code inside your `server.js`:

```
// add static handler to have access to all files inside public
const staticHandler = express.static("public");

// pass into .use
server.use(staticHandler);
```

Add the following inside `<head>` tag of html

```
<link rel="stylesheet" type="text/css" href="./style.css">
```

#### Reset database in Cypress tests

Configure Cypress to run the `populate_db` script on every Cypress 'task'. This will repopulate the db with the code in your `init.sql`, essentially 'resetting' the db.

Edit `index.js` file inside `cypress/plugins` with following code:

```
const { execFileSync } = require("child_process");

module.exports = (on, config) => {
    on("task", {
      resetDb: () => {
        console.log("Resetting DB...");
        return execFileSync("./scripts/populate_db");
      },
    });
  };
```

Add the following to your `cypress/integration/tests.js` file to run the task before each test

```
beforeEach(() => {
  cy.task("resetDb");
});
```
