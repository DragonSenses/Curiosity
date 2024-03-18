//jshint esversion:6
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'; // eslint-disable-line no-unused-vars
import mongoose from 'mongoose';
// import { encrypt } from 'mongoose-encryption';
// import { hash, compare } from 'bcryptjs';
import bcrypt from 'bcrypt';

const saltRounds = 10;

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

// Define a user schema with email and password fields
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

/* Apply the encrypt plugin to the user schema with the secret string. 
  Encrypt only the password field.
  This will add _ct and _ac fields to the schema for storing the ciphertext 
  and the authentication code.
  It will also add encrypt, decrypt, sign, and authenticate methods to the schema.
*/
// userSchema.plugin(encrypt, { secret: process.env.SECRET_STRING, encryptedFields: ['password'] });

// Create a user model from the user schema
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
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Store hash in your password DB.

    // Create a new user document with the email & password from the request body
    const newUser = new User({
      email: req.body.username,
      password: hash
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

});

// Route handler for /login path
app.post("/login", (req, res) => {
  // Extract username and password from the request body
  const username = req.body.username;
  const password = req.body.password;

  // Find a user document in the database that matches the email
  User.findOne({ email: username })
    .then(foundUser => {
      // If user exists, compare the password with the stored password
      if (foundUser && (foundUser.password === password)) {
        // If the passwords match, render the secrets page
        res.render("secrets");
      } else if (foundUser && (foundUser.password !== password)) {
        // If passwords do not match, send an error message or redirect
        res.send("Wrong password");
      } else {
        // If the user does not exist, send an error message or redirect
        res.send("User not found");
      }
    })
    .catch(error => {
      // Handle any error that occurs during the process
      console.log(error);
    });
});

/* Starts the server & listens for requests on the specified port */
app.listen(port, () => {
  console.log(`Server started on port ${ port }.`);
});