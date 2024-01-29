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

```sh
npm i express ejs body-parser
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

## Level 1: Basic Account creation