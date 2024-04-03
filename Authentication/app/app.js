import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'; // eslint-disable-line no-unused-vars
import mongoose from 'mongoose';

/* Packages for session management*/
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

/* Constant variables */
const port = 3000;
const app = express();

/* Express middleware */
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true 
}));

app.use(session({
  secret: 'Your secret key here',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);

// Define a user schema with email and password fields
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

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

app.get("/logout", (req, res) => {
  res.render("home");
});

app.post("/register", (req, res) => {

});

app.post("/login", (req, res) => {

});

/* Starts the server & listens for requests on the specified port */
app.listen(port, () => {
  console.log(`Server started on port ${ port }.`);
});