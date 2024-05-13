import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// Import the 'dotenv' package to load environment variables from a .env file
import dotenv from 'dotenv';
dotenv.config();

/* Create an Express app */
const app = express();
const port = 3000;

// Set up a PostgreSQL client connection
const db = new pg.Client({
  user: "postgres", 
  host: "localhost",
  database: "world", 
  password: process.env.DB_PASSWORD, 
  port: 5432,
});

// Connect to the PostgreSQL database
db.connect();


/* Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${ port }`);
});
