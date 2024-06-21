import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'; // eslint-disable-line no-unused-vars
import mongoose from 'mongoose';

/* Packages for session management*/
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

// Import the Google OAuth 2.0 authentication strategy
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import findOrCreate from 'mongoose-findorcreate';

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
  secret: process.env.SECRET_SESSION_STRING,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);

// Define a user schema with email and password fields
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Create a user model from the user schema
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

// Serialize user data for session storage
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    // Create an object with relevant user properties
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

// Deserialize user data from session
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    // Return the user object retrieved from the session
    return cb(null, user);
  });
});

// Fix based on PR #51: https://github.com/jaredhanson/passport-google-oauth2/pull/51
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function (accessToken, refreshToken, profile, cb) {
  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);
  console.log("User Profile:", profile);

  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}));

/* Routes */
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/auth/google", (req, res) => {
  // Use passport to authenticate the user using the Google strategy
  passport.authenticate("google", { scope: ["profile"] });
});

app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
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

app.get("/secrets", (req, res) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", (req, res) => {

  User.register({ username: req.body.username }, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login", (req, res) => {
  // Create a new user
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  // Use passport to log-in the user
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

app.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

/* Starts the server & listens for requests on the specified port */
app.listen(port, () => {
  console.log(`Server started on port ${ port }.`);
});