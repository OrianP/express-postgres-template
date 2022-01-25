// require node-posgtres library
const pg = require("pg");

// throw error if db url does not exist on .env file
if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is not set");
}

// assign db by creating a new pg Pool object
// the connection string is a string that specifies how to connect to the database. It is set to the db url inside the .env file
const db = new pg.Pool({
	connectionString: process.env.DATABASE_URL,
});

// export the db for other parts of the server to use
module.exports = db;