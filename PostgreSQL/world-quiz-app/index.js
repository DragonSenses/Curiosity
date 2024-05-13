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

// Initialize an array of quiz questions with country-capital pairs
let quiz = [
  { country: "United States of America", capital: "Washington" },
  { country: "United Kingdom", capital: "London" },
  { country: "France", capital: "Paris" },
  { country: "China", capital: "Beijing" },
  { country: "South Korea", capital: "Seoul" },
  { country: "Japan", capital: "Tokyo" },
];

try {
  // Execute a query to fetch data from the 'capitals' table
  const res = await db.query("SELECT * FROM capitals");
  // Update the 'quiz' array with the retrieved rows
  quiz = res.rows;
} catch (err) {
  // Handle any errors during query execution
  console.error("Error executing query:", err.stack);
} finally {
  // Close the database connection
  db.end();
}


/* Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${ port }`);
});