# Authentication

Goal: Strengthen my understanding of authentication

As of writing in Jan. 2024, I've had experience with authentication with both self-hosting and authentication providers. [See specifics on authentication experiences below](#authentication-experiences).

I want to dedicate this section for learning more. Here's a list of I want to cover:

- [Auth.js](https://authjs.dev/) with Next.js
- [passport.js](https://www.passportjs.org/), simple, unobtrusive authentication for Node.js
  - [Passportjs | Better Documentation](https://github.com/jwalton/passport-api-docs)
- 

## My Authentication Experiences

I've had experience with both self-Hosting and using authentication providers.

For building authentication for self-hosting and from the ground-up, I covered these levels of security:

1. Basic Account creation (username/password)
2. Database encryption
3. Hashing passwords
4. Salting/Hashing passwords
5. Cookies, JSON Web Tokens (JWT) and Sessions
6. OAuth, social sign-on (SSO)

## Self Hosting

### Job Tracking App
  - JWT, JSON Web tokens
  - Basic account creation with username, email & password
  - hashing passwords with bcrypt
  - using a Bearer Token
  - Testing with Postman
  - Salting/Hashing passwords
  - Database encryption
  
## Authentication Providers

### complete-ecommerce-store

  - [Clerk](https://clerk.com/) for authentication and user management on Next.js
  - Social Sign-On (SSO) for high conversion
  - Creating Webhook endpoints
  - Multifactor Authentication
  - Best practices for `<SignIn/>` and `<UserProfile/>` components

---

# Developing an App with authentication as the main learning focus

Going to be building an app that will gradually gain more layers of security as we go. 

Some design decisions will favor neuroplasticity (i.e., learning new things) and ease of building such as using EJS (a templating language with HTML markup with plain JS) over React.

## Specifications

- User can Sign-Up, Log-In and Sign-out the website
- User can log-in and access protected routes to view "*secrets*"
- Unauthenticated users **cannot** view *secrets*
- User can Create, Read, Update, Delete *secrets*

## Tech used

- Express
- EJS
- MongoDB
  - Mongoose

## Project Structure

-app
  |- public
    |- css
      |- styles.css
  |- views
    |- partials
      |- footer.ejs
      |- header.ejs
    |- home.ejs
    |- login.ejs
    |- register.ejs
    |- secrets.ejs
    |- submit.ejs
  |- .gitignore
  |- app.js
  |- package.json

The git ignore file will ignore our `/node_modules`. 

`.gitignore`
```
# dependencies
/node_modules
```

## Project Setup

Install packages:

- [Express](https://expressjs.com/en/starter/installing.html)
- [body parser](https://expressjs.com/en/resources/middleware/body-parser.html)
- [EJS](https://ejs.co/#install)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [mongoose](https://www.npmjs.com/package/mongoose)

```sh
npm i express ejs body-parser dotenv mongoose
```

### Add "type": "module" to your package.json file.

Configure `package.json` to use modules. e.g.,

`package.json`
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  // ...
}
```

Also configure `ESLint`'s config file `.eslintrc` by specifying `sourceType` as module

`.eslintrc`
```json
    "parserOptions": {
      "sourceType": "module",
      "ecmaVersion": 2022
  }
```

### Create environment variables to protect sensitive data

Since we are using database, we are going to have sensitive data. 

Install `dotenv`

```sh
npm i dotenv
```

Create `.env` file at root of project. Make sure `.env` is added in the `.gitignore`.

Now we can create  variables in the `.env` file and use them to refer to sensitive data such as connection strings for databases, or API keys.

```.env
YOUR_SECRET_KEY="SECRET_KEY_GOES_HERE"
```

Next in our app we can import and configure dotenv. And then can interpolate the variable using `process.env.YOUR_SECRET_KEY`;

```js
import 'dotenv/config'

function connectToDatabase(){
  connect(process.env.YOUR_SECRET_KEY);
}
```

## Develop `app.js` express server

Set up express, ejs, and bodyParser in node project

This commit sets up the express, ejs, and bodyParser packages in the node project. Express is used to create a web server and handle routing. Ejs is used to render dynamic HTML views. BodyParser is used to parse incoming request bodies. The commit also sets up the port, the static folder, and the view engine for the app. The app listens for requests and logs the port number or any errors to the console.

Let's start with the basic template:

```js
//jshint esversion:6
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'; // eslint-disable-line no-unused-vars

const port = 3000;
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
```

### Routes

Next we want to setup the routes found in our `/views` folder. Create the route handlers for the root route, login, and register.

Add routes for home, login, and register views

This commit adds three routes to the express app: /, /login, and /register. These routes handle GET requests and render the corresponding views using ejs. The views are located in the views folder and contain the HTML templates for the home page, the login form, and the registration form. These routes are part of the basic functionality of the app and allow users to navigate between different pages.

```js
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
```

With routes in place we can start adding security.

# Level 1: Basic account creation

Basic account creation on a website is a process that allows you to register as a user and access the features and content of that website. 

Usually, you need to provide some information about yourself, such as your name, email address, and password, and agree to the terms and conditions of the website. Some websites may also ask you to verify your email address or phone number, or answer some security questions.

Steps for the user to sign-up and register

1. Click sign-up or register button
2. Fill out registration form. User must make sure to use a valid email adress and strong password.
3. Submit form and check your email for a confirmation link or code. Click on the link or enter the code to activate your account.
4. Log in to your account with your email and password. You can now access the website’s features and content, and edit your profile settings.

For our app, we will simply have them sign-up with just email and password without validation. There won't be a follow-up email with a confirmation link. We will also store this information in the database (although it is a security risk to store passwords as-is) and check for every subsequent login attempt if the password matches.

We can certainly improve this process with:

- form validation
- follow-up email with confirmation link
- hash passwords

But we will discuss these in higher levels of security, we we will abstain only for now so as to not lose focus on the first level of security of account creation.

## User Database

We are going to setup the database. We will be using MongoDB. Going to store the databse on MongoDB's database service : Atlas.

Make an account if you do not have one, then connect to the Cluster.

1. Select your driver and version

Node.js
Version 4.1 or later

2. Install your driver

```sh
npm install mongodb@4.1
```

3. Add your connection string into your application code

Save the connection string inside the `.env` file to a variable.

Then install mongoose if you haven't already.

```sh
npm i mongoose
```

Now in our `app.js` we can connect to the database like so:

```js
// ...imports
import 'dotenv/config';
import mongoose from 'mongoose';

/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String, {useNewUrlParser: true});
```

- `mongoose` library is a MongoDB object modeling tool that helps you work with MongoDB in an asynchronouse environment
- `mongoose.connect()` is a function that establishes a connection to a MongoDB database. It takes two parameters: a connection and an options object
- `process.env.MongoDB_Connection_String` is a variable that stores the connection string, which is a URI that specifies the location and credentials of the database. The connection string is stored in an environment variable, which is a way of hiding sensitive information from the code
- `{useNewUrlParser: true} `is an options object that passes some configuration settings to the mongoose.connect function. In this case, the option useNewUrlParser tells mongoose to use a new URL parser that is more secure and robust

For more see [Getting Started with MongoDB & Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)