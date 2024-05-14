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

// Initialize a variable to keep track of the total correct answers
let totalCorrect = 0;

// Initialize an empty object for the current question
let currentQuestion = {};

/**
 * Asynchronous function to select the next question
 */
async function nextQuestion() {
  // Generate a random index to select a country from the 'quiz' array
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  // Set the selected country as the current question
  currentQuestion = randomCountry;
}

try {
  // Execute a query to fetch data from the 'capitals' table
  const res = await db.query("SELECT * FROM capitals");
  // Update the 'quiz' array with the retrieved rows
  quiz = res.rows;
} catch (err) {
  // Handle any errors during query execution
  console.error("Error executing query:", err.stack);
  // Fallback: Use the predefined quiz questions
  console.log("Using predefined quiz questions instead.");
} finally {
  // Close the database connection
  db.end();
}

/* Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${ port }`);
});
