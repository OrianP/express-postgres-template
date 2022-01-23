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
9. Create a file for writing your tests inside `cypress/integration/`
10. Delete auto-generated `example/` folder (optional)
#### Database
11. Install [node-postgres](https://node-postgres.com/) library (a collection of node.js modules for interfacing with your PostgreSQL database).  
`npm install pg`
13. Install the [dotenv](https://www.npmjs.com/package/dotenv) library  
`npm install dotenv`
14. create db
15. populate db
16. Add a `dev` command to your script in `package.json`. This tells Node to use the dotenv library to load env vars before our server starts.
```
{
  "scripts": {
    "dev": "nodemon -r dotenv/config server.js"
  }
}
```
