# express-postgres-template
A project setup template with express server, postgres database and cypress testing.   
This guide is based on [Founders and Coders](https://learn.foundersandcoders.com/) curriculum.    

## Project setup guide
Before you begin, make sure you [install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)! 

The steps I followed to create this project template
1. Create a repo on GitHub
2. Clone to your local machine
3. Add a `.gitignore` file (I added this when I created the repo on GitHub and deleted any irrelevant template content)  
### In your terminal
4. Initialise the project to create a package.json  
`npm init -y`
#### Server
5. Install the Express server library  
`npm install express`
6. Install nodemon. This is a helper that auto-restarts your server when you save changes  
`npm install nodemon`
#### Tests
7. Install Cypress for testing  
`npm install -D cypress`
8. Once Cypress is installed, open your `package.json` and edit the `"test"` script:
```
{
  "scripts": {
    "test": "cypress open"
  }
}
```
9. Run the test script you just edited   
`npm run test`
This will create a cypress folder in your root directory  
10. Delete any unwanted auto-generated folders (i.e `integration/1-getting-started`) (optional)
```
cd cypress/integration
rm -r <folder-name>
```
11. Create a file for writing your tests inside `cypress/integration/`
`touch test.js`

#### Database
12. Install [node-postgres](https://node-postgres.com/) library (a collection of node.js modules for interfacing with your PostgreSQL database).  
`npm install pg`
13. Install the [dotenv](https://www.npmjs.com/package/dotenv) library  
`npm install dotenv`
14. **Create and populate database**:
    - Create a `scripts` folder in your root directory
    - Follow the steps in this [example repo](https://github.com/oliverjam/express-postgres-example) by [oliverjam](https://github.com/oliverjam) for writing script files that will create and populate your database 
    - Remember to change the permissions on each of your script files in your terminal to make them executable    
    `chmod +x ./scripts/your-filename`
    - Create your local database by running the create_db script with the name you want to give your database
    ```
    ./scripts/create_db <your-db-name>
    ```
    This will create a user, database and .env file containing the DATABASE_URL environment variable
    - Create a `database` folder in your root directory and create `connection.js` and `init.sql` files witihn it
    ```
    > mkdir database
    > cd database
    > touch connection.js init.sql
    ```
    - Add the following code inside `connection.js`
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
    - Create a database table and insert some example data into it inside your `init.sql` i.e
    - Run the script to populate your database
    `./scripts/populate_db`
    - Check your database in psql...
   
15. Add basic server code...
16. Add a `dev` command to your script in `package.json`. This tells Node to use the dotenv library to load env vars before our server starts.
```
{
  "scripts": {
    "dev": "nodemon -r dotenv/config server.js"
  }
}
```


