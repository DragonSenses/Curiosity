//jshint esversion:6
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'; // eslint-disable-line no-unused-vars
import 'dotenv/config';
import mongoose from 'mongoose';

/* Constant variables */
const port = 3000; // Define port number for the server
const app = express(); // Create an express app

/* Express middleware */
app.use(express.static("public")); // Server static files from the public folder
app.set('view engine', 'ejs'); // Sets view engine to EJS
app.use(bodyParser.urlencoded({ // Parses incoming request bodies
  extended: true // Allow parsing of nested objects
}));

/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);

// Define a schema for user documents
const userSchema = {
  email: String,
  password: String,
};

// Create a model for user collection
const User = new mongoose.model("User", userSchema);

/* Routes */
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  // Create a new user document with the email & password from the request body
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  // Save the new user to the database
  newUser.save()
    .then(() => {
      res.render("secrets");
      // Do something with user document, such as sending a response or redirecting
      // res.status(201).send("User created");
    })
    .catch(err => { 
      // Log the error to the console or a file
      console.error(err);
      // Send an error response or redirect to an error page
      res.status(500).send("Something went wrong");
    });
});

/* Starts the server & listens for requests on the specified port */
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});