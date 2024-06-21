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

### Running the app

We can now run the app with this command:

```sh
node app.js
```

We can also add a script to `package.json`

```json
  "scripts": {
    "dev": "node app.js",
  },
```

Then we can run our app with the command

```sh
npm run dev
```

For those with Next.js experience, this is a more familiar command.

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

We are going to setup the database. We will be using MongoDB. Going to store the database on MongoDB's database service : Atlas.

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
mongoose.connect(process.env.MongoDB_Connection_String);
```

- `mongoose` library is a MongoDB object modeling tool that helps you work with MongoDB in an asynchronouse environment
- `mongoose.connect()` is a function that establishes a connection to a MongoDB database. It takes two parameters: a connection and an options object
- `process.env.MongoDB_Connection_String` is a variable that stores the connection string, which is a URI that specifies the location and credentials of the database. The connection string is stored in an environment variable, which is a way of hiding sensitive information from the code

For more see [Getting Started with MongoDB & Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

### Define a User Schema

A schema defines the structure of your collection documents. A Mongoose schema maps directly to a MongoDB collection.

```js
/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);

// Define a schema for user documents
const userSchema = {
  email: String,
  password: String,
};

// Create a model for user collection
const User = new mongoose.model("User", userSchema);
```

## Handle POST request for /register route

Which route will we create the user? In the register route, we have two inputs and a submit button:

`register.ejs`
```html
<input type="email" class="form-control" name="username">

<input type="password" class="form-control" name="password">

<button type="submit" class="btn btn-dark">Register</button>
```

When user submits their email and password, they create a `POST` request which we should capture in our server.

So we create a register POST route where we will:

Add register route to save new user & render secrets page

- Create a new user with the incoming email and password from the req.body
- Render the secrets page
- Catch any errors

```js
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
    })
    .catch(err => { 
      // Log the error to the console or a file
      console.error(err);
      // Send an error response or redirect to an error page
      res.status(500).send("Something went wrong");
    });
});
```

## Handle POST request for /login route

For the login route, we want to extract the `username` and `password` from the `req.body`. Then we can authenticate.

Add login route to authenticate user & render protected route

If the username exists in the database, then check if the username and the passwords match. If passwords match then render the the secrets page.

```js
// Route handler for /login path
app.post("/login", (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Find a user document in the database that matches the email
  User.findOne({ email: username })
  .then(foundUser => {
      // If user exists, compare the password with the stored password
      if (foundUser && (foundUser.password === password)) {
        // If the passwords match, render the secrets page
        res.render("secrets");
      } 
    })
    .catch(error => {
      // Handle any error that occurs during the process
      console.log(error);
    });
});
```

We can also check for the other cases where:

- passwords do not match, then send an error message
- user not found in the database, so user doesn't exist, send an error message

```js
// Route handler for /login path
app.post("/login", (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

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
```

Refactor login route to use promise instead of callback.

This change fixes the MongooseError: Model.findOne() no longer accepts a
callback, which occurs when using an outdated version of Mongoose.
By using  a promise, the code becomes more readable and consistent with
the latest Mongoose API.

With these changes we now have a running application that allows users to create a basic account.

Features:

User can
- register with their email
- login

## Note: do not store passwords in a database

The issue with the current app is that in the database we can see the user's password in plain text.

Storing passwords directly in a database is bad because it exposes the passwords to anyone who can access the database, either by hacking, stealing, or compromising it. This can lead to unauthorized access to the user’s account and other systems where the user may have reused the same password. It can also damage the reputation and trust of the service that stored the passwords.

# Level 2: Encryption

The next level of authentication is encryption.

Encryption is a way of protecting data from unauthorized access by transforming it into a secret code that only authorized parties can understand. Encryption uses mathematical algorithms and keys to scramble and unscramble data. There are different types of encryption, such as symmetric-key encryption and asymmetric-key encryption, that use different methods and keys to encrypt and decrypt data.

- [Cryptii is a web app for modular conversion, encoding & encryption](https://cryptii.com/), we can explore various ways for encryption such as Caesar cipher or Base64.

For now we will use the package [mongoose-encryption](https://www.npmjs.com/package/mongoose-encryption), which handles encryption and authentication for mongoose documents.

Install the package

```sh
npm i mongoose-encryption
```

Import

```js
import mongoose from 'mongoose';
import { encrypt } from 'mongoose-encryption';
```

Now to use it we need to change our schema, which so far is just a simple object.

```js
const userSchema = {
  email: String,
  password: String,
};
```

We have to create to pass in the object into `mongoose.Schema()` class

```js
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
```

- [mongoose-encryption Usage](https://www.npmjs.com/package/mongoose-encryption#usage)

Generate and store keys separately. They should probably live in environment variables, but be sure not to lose them. You can either use a single `secret` string of any length; or a pair of base64 strings (a 32-byte `encryptionKey` and a 64-byte `signingKey`).

For convenience, you can also pass in a [secret string instead of two keys](https://www.npmjs.com/package/mongoose-encryption#secret-string-instead-of-two-keys).

```js
var secret = process.env.SOME_LONG_UNGUESSABLE_STRING;
userSchema.plugin(encrypt, { secret: secret });
```

Let's create that string in our environment variables, in the `.env` file create a variable `SECRET_STRING` and set the value to anything you want.

- You can find a site that can generate an encryption key for you such as [randomkeygen.com](https://randomkeygen.com/)

```js
import { encrypt } from 'mongoose-encryption';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const secret = process.env.SECRET_STRING;
userSchema.plugin(encrypt, { secret: secret });

const User = new mongoose.model("User", userSchema);
```

Make sure that we add the `encrypt` package as a plugin to the schema before creating the model.

- [Mongoose plugins | Reference](https://mongoosejs.com/docs/plugins.html)

Schemas are pluggable, i.e., they allow for applying pre-packaged capabilities to extend their functionality.

feat: encrypt user schema with mongoose-encryption

Use the mongoose-encryption plugin to encrypt the email and password fields of the user schema with a secret string from the environment variable. This adds security and privacy to the user data stored in MongoDB.

### Issue: entire user database is encrypted

```js
userSchema.plugin(encrypt, { secret: secret });
```

The plugin encrypts the entire database. Meaning both email and password will be encrypted. However, this may not be the desired behavior as we may need to search for users using their email.

Instead, we should only encrypt the password field. To do that we need to change the options for the [mongoose-encryption to encrypt only certain fields](https://www.npmjs.com/package/mongoose-encryption#encrypt-only-certain-fields). e.g.,

```js
// encrypt age regardless of any other options. name and _id will be left unencrypted
userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['age'] });
```

So what we need to do is add an object with `encryptedFields` at the end of the plugin.

feat(user): encrypt password field with mongoose-encryption

Use the mongoose-encryption plugin to encrypt only the password field of the user schema with a secret string from the environment variable. This adds security and privacy to the user password stored in MongoDB.

```js
// Apply the encrypt plugin to the user schema with the secret string
// Encrypt only the password field
// This will add _ct and _ac fields to the schema for storing the ciphertext and the authentication code
// It will also add encrypt, decrypt, sign, and authenticate methods to the schema
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });
```

Now our password field will be encrypted from now on as `mongoose-encryption` will encrypt when we call `save()` and decrypt during `find()` call on documents.

# Using Environment Variables to keep sensitive data safe

To add an extra layer of authentication we use environment variables. We have already been doing this by using the `dotenv` package and storing our passwords in a `.env` file.

The `.env` file stores our sensitive information such as encryption keys, API keys and passwords.  Then the [Next.js built-in support for environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) or [dotenv](https://www.npmjs.com/package/dotenv) module will load environment variables from a `.env` file into `process.env`. Storing configuration in the environment separate from code is based on The [Twelve-Factor App](https://12factor.net/config) methodology.

We can review how to get environment variables running.

Install `dotenv` package

```sh
# install locally (recommended)
npm install dotenv --save
```

Create a `.env` file in the root of your project:
```sh
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

As early as possible in your application, import and configure dotenv:

```sh
import 'dotenv/config';
```

That's it. `process.env` now has the keys and values you defined in your `.env` file:

```js
let secret = process.env.SECRET_KEY;
```

The final step is to make sure we add a hidden file `.gitignore`, which tells git which files to ignore when it uploads to a remote repo. Then we add `.env` to the `.gitignore` file, this way we won't push the environment variables to the repo.

We can find a [gitignore file template for Node](https://github.com/github/gitignore/blob/main/Node.gitignore).

- [Github gitignore collection](https://github.com/github/gitignore)

With that in place, our sensitive data will no longer be public.

In `app.js` we used environment variables `process.env.MongoDB_ConnectionString` and `process.env.SECRET_STRING`:

```javascript
/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);

// Apply the encrypt plugin to the user schema with the secret string
// Encrypt only the password field
// This will add _ct and _ac fields to the schema for storing the ciphertext and the authentication code
// It will also add encrypt, decrypt, sign, and authenticate methods to the schema
userSchema.plugin(encrypt, { 
  secret: process.env.SECRET_STRING, 
  encryptedFields: ['password'] 
});
```

#### Note on deployment and production
 
When we want to put the project to production, when we are using a hosting service such as render or heroku, we have to specify the environment variables in the config. Make sure to set the environment variables and/or config variables. 

# Level 3: Hashing Passwords

The next level of security for authentication is to hash the password. We do not store the password directly, instead we take the password and pass it through a hash function. Hash functions are **one-way functions**, a unidirectional transformation, where they are designed to be irreversible. i.e., it is computationally infeasible to retrieve the original input. The output is a **hash**, or **hash value**, which we store instead of the password.

A computationally difficult one-way function is finding the factors of a co-prime number. e.g., find the two factors (not including 377 and 1) that when multiplied equal to 377. It is more time consuming to find out those factors are 13 and 29, than it is to multiply 13 and 29 to get 377. This is similar to hash functions in which are calculated quickly going forwards but computationally infeasible to go backwards.

### Hash functions

Hash functions are commonly consist of two portions - a *hash code* and a *compression function*.

1. **Hash code** maps a key `k` to an integer

The first action that a hash function performs is to take an arbitrary key k in our
map and compute an integer that is called the hash code for k; this integer need not
be in the range [0,N−1], and may even be negative. We desire that the set of hash
codes assigned to our keys should avoid collisions as much as possible. For if the
hash codes of our keys cause collisions, then there is no hope for our compression
function to avoid them.

2. **Compression function** maps the hash code to an integer within a range of indices, [0, N-1]

The hash code for a key k will typically not be suitable for immediate use with a
bucket array, because the integer hash code may be negative or may exceed the capacity
of the bucket array. Thus, once we have determined an integer hash code for
a key object k, there is still the issue of mapping that integer into the range [0,N−1].
This computation, known as a compression function, is the second action performed
as part of an overall hash function. A good compression function is one
that minimizes the number of collisions for a given set of distinct hash codes.


A simple compression function is the *division method* which maps an integer i to where N is a fixed positive integer. `i mod N`.

A more sophisticated compression function, which helps eliminate repeated patterns
in a set of integer keys, is the Multiply-Add-and-Divide (or "MAD") method.
This method maps an integer i to
`[(ai+b) mod p] mod N`,
where N is the size of the bucket array, p is a prime number larger than N, and a
and b are integers chosen at random from the interval [0, p−1], with a > 0.

### Hash functitons are one-way functions

**Hash functions** are **one-way functions**. They take an input (often called a **message** or **plaintext**) and produce a fixed-length string of characters (the **hash value** or **digest**). Here are some key points about hash functions:

1. **Unidirectional Transformation**:
   - Hash functions are designed to be **irreversible**. Given a hash value, it is computationally infeasible to retrieve the original input.
   - This property makes them suitable for tasks like **password hashing**, where you store the hash of a password instead of the actual password itself.

2. **Deterministic**:
   - Hash functions always produce the same hash value for the same input.
   - If you hash the same message twice, you'll get the same result.

3. **Fixed Output Length**:
   - Regardless of the input size, hash functions produce a fixed-length output (e.g., 128 bits, 256 bits, etc.).

4. **Collision Resistance**:
   - A good hash function minimizes the chance of **collisions** (two different inputs producing the same hash value).
   - While collisions are theoretically possible, modern cryptographic hash functions make them extremely unlikely.

5. **Examples**:
   - Common hash functions include **SHA-256**, **MD5**, and **SHA-1** (though the latter two are considered insecure due to vulnerabilities).

Remember that hash functions are widely used in security, data integrity checks, and digital signatures. However, they are not encryption mechanisms; they don't provide confidentiality. If you need to encrypt data, use encryption algorithms instead. 

## Implementing password hashing

So how do we implement it on our app?

When the user registers their login credentials, we take the password and convert it to a hash. Then we store the hash in the database.

Now on every subsequent login, we hash the password attempt and compare the result with the hash in the database. If both hashes match, then they must be the same password because hashes are determinisitic (always produce the same hash value for the same input).

### Use MD5 to hash user passwords

Let's use [md5](https://www.npmjs.com/package/md5) package, a JavaScript function for hashing messages with MD5. [MD5 algorithm](https://en.wikipedia.org/wiki/MD5) is a widely used hash function producing a 128-bit hash value.

```sh
npm i md5
```

Then import the package

```javascript
import md5 from 'md5';
```

Usage:

```javascript
var md5 = require('md5');
 
console.log(md5('message'));
```

Now instead of using `mongoose-encryption` we can directly hash the password when saving the user in the `/register` route. Then in ther `/login` route, we hash the password from the request body and compare it to the one in the database.

```js
import md5 from 'md5';
// ...
app.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });

  newUser.save()
    .then(() => {
      res.render("secrets");
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Something went wrong");
    });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({ email: username })
  .then(foundUser => {
      if (foundUser && (foundUser.password === password)) {
        res.render("secrets");
      } else if (foundUser && (foundUser.password !== password)) {
        res.send("Wrong password");
      } else {
        res.send("User not found");
      }
    })
    .catch(error => {
      console.log(error);
    });
});
```

feat: Add MD5 password hashing for user registration

This commit enhanced user security by implementing MD5 hashing for user passwords during registration. The `md5` module in Node.js is used to create a 128-bit hash value from the provided password. The hashed password is then stored securely in the database.

feat: Add MD5 password validation for user login

The full code:

```javascript
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'; // eslint-disable-line no-unused-vars
import mongoose from 'mongoose';
// import { encrypt } from 'mongoose-encryption';
import md5 from 'md5';

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
  // Create a new user document with the email & password from the request body
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
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

// Route handler for /login path
app.post("/login", (req, res) => {
  // Extract username and password from the request body
  const username = req.body.username;
  const password = md5(req.body.password);

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
  console.log(`Server started on port ${port}.`);
});
```

#### Limitations of MD5, no longer secure for cryptographic purposes

**MD5**, which stands for **Message Digest Algorithm 5**, is a widely used cryptographic hash function. However, it's essential to understand its limitations:

1. **Security**:
   - **MD5** is **not considered secure** for cryptographic purposes anymore. It has several vulnerabilities:
     - **Collision Vulnerability**: Different inputs can produce the same MD5 hash (collision). Attackers can intentionally create two different messages with the same MD5 hash.
     - **Preimage Vulnerability**: Given an MD5 hash, it's possible to find a message that produces that hash (preimage attack).
   - Due to these vulnerabilities, MD5 is **unsuitable for security purposes** such as password hashing or digital signatures.

2. **Reversibility**:
   - **MD5 is irreversible**. In other words, you cannot directly reverse an MD5 hash to obtain the original input.
   - However, attackers can use **brute-force attacks** or **rainbow tables** to find a matching input for a given MD5 hash.
   - **Brute-force attacks** involve trying all possible inputs until a match is found. With modern computing power, this process can be relatively fast.
   - **Rainbow tables** are precomputed tables that map hashes to their corresponding inputs. These tables allow attackers to quickly find a match for a given hash.
   - The effectiveness of reversing MD5 depends on the length and complexity of the original input. Short and simple inputs are more susceptible to attacks.

3. **Recommendations**:
   - For security purposes, **avoid using MD5**. Instead, consider using stronger hash functions like **SHA-256** or **bcrypt**.
   - If you need to hash passwords or sensitive data, use a **salted hash** (where a unique salt is added to each input before hashing) to enhance security.

In summary, while MD5 is still used in non-cryptographic contexts (such as checksums), it should not be relied upon for security-related tasks. For secure hashing, choose stronger algorithms.

See [MD5 Security](https://en.wikipedia.org/wiki/MD5).

## Hashing & Encryption

With the MD5 algorithm implemented for both user registration and login, this adds another layer of security for our users. In the database, we can see that the passwords only store the **hash value, hash code, hash digest** or simply a **hash** which are all names for the result of the hash function. It is computationally difficult to retrieve the original input (the user's password).

Hashing passwords are more secure than simple encryptions, because we have the vulnerability of the encryption key.

**Hashing** and **encryption** serve different purposes and have distinct characteristics. Let's explore why **hashing passwords** is generally considered more secure than encryption:

1. **One-Way Function**:
   - **Hashing** is a **one-way function**, meaning that once you hash a password, it is **impossible to reverse** the process and obtain the original plaintext password.
   - In contrast, **encryption** is a **two-way function**, allowing you to decrypt ciphertext back into plaintext using the right key.

2. **Password Storage**:
   - When it comes to **password storage**, **hashing** is the preferred approach. Here's why:
     - **Hashed passwords** are stored securely in databases. Even if an attacker gains access to the database, they cannot retrieve the original passwords from the hash values.
     - **Encrypted passwords**, on the other hand, can be decrypted if the attacker obtains the encryption key. This poses a significant security risk.

3. **Password Validation**:
   - During **user authentication**, systems need to validate passwords without revealing the actual password.
   - **Hashing** allows this validation without exposing the original password. The system hashes the user's input and compares it to the stored hash.
   - **Encryption**, while reversible, is not suitable for this purpose because it requires the decryption key.

4. **Salting**:
   - To enhance security, **hashing** often involves adding a **salt** (a random value) before hashing the password.
   - Salting ensures that even if two users have the same password, their hashed values will be different.
   - **Encryption** does not inherently include salting, making it less secure for password storage.

5. **Use Cases**:
   - **Encryption** is ideal for securing data during transmission or sharing confidential messages. It requires a shared key between sender and recipient.
   - **Hashing**, especially with salting, is best for **passwords** and other sensitive data that should remain irreversible.

In summary, **hashing** provides a strong layer of security for password storage and validation, while **encryption** serves different purposes such as confidentiality during data transmission. For password security, choose **hashing** with proper salting!

# Level 4: Salting & Hashing Passwords with bcrypt

The next level of security for authentication is salting and hashing passwords.

- [bcrypt](https://www.npmjs.com/package/bcrypt)

Install bcrypt package to help has passwords.

```sh
npm i bcrypt
```

What is salting?

- To enhance security, **hashing** often involves adding a **salt** (a random value) before hashing the password.
- Salting ensures that even if two users have the same password, their hashed values will be different.

Salt is stored in the database, along with the hash.

[bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password-hashing function that we'll use. Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function: over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power.

It also has the concept of *salt rounds*, how many rounds you salt your password with.

The first round of salt takes the password and a randomly generated salt and creates a hash out of it. The second round takes the hash from round 1 and adds the same salt from before and run it through bcrypt again to get another hash.

The number of times we repeat this process is the number of salt rounds.

## Using bcrypt

- [bcrypt](https://www.npmjs.com/package/bcrypt)

Usage:

```js
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
```

Walkthrough:

1. Import
   
The import can be CJS (Common JS)

```javascript
const bcrypt = require('bcrypt');
```

or ES6 Modules (ESM)
```javascript
import bcrypt from 'bcrypt';
```

2. Salt rounds

Then we define the number of salt rounds

```js
const saltRounds = 10;
```

Remeber that the more we increase the number of `saltRounds`, the harder the computer will have to work to generate the hashes. 

- [A Note on Rounds | bcrypt](https://www.npmjs.com/package/bcrypt#a-note-on-rounds) has a table where we can roughly expect how many hashes it would take.

```sh
From @garthk, on a 2GHz core you can roughly expect:
rounds=8 : ~40 hashes/sec
rounds=9 : ~20 hashes/sec
rounds=10: ~10 hashes/sec
rounds=11: ~5  hashes/sec
rounds=12: 2-3 hashes/sec
rounds=13: ~1 sec/hash
rounds=14: ~1.5 sec/hash
rounds=15: ~3 sec/hash
rounds=25: ~1 hour/hash
rounds=31: 2-3 days/hash
```

3. Use bcrypt to hash a password

Technique 1 (generate a salt and hash on separate function calls):

```javascript
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
```

Technique 2 (auto-gen a salt and hash):

```javascript
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});
```

## Implement with bcrypt

In our `app.js`, in the register route we want to generate the hash not with MD5 but with bcrypt. Let's take a look at our register route

```javascript
app.post("/register", (req, res) => {
  // Create a new user document with the email & password from the request body
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
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
```

We will go with technique 2 to auto-generate a salt and hash.

```javascript
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});
```

Here's the register route using bcrypt hash

```js
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
```

### Register route with bcrypt

Refactor post register handler to use bcrypt for password hashing

`Authentication\app\app.js`
```javascript
// ... imports
import bcrypt from 'bcrypt';

const saltRounds = 10;

/* Constant variables */
/* Express middleware */
/* Connect to Database */

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

    const newUser = new User({
      email: req.body.username,
      password: hash
    });
  
    newUser.save()
      .then(() => {
        res.render("secrets");
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Something went wrong");
      });
  });

});
```

Now we can register a user with a username and password. We can check if the password was hashed properly in the database (I'm using MongoDB Atlas to view the database).

### Login route with bcrypt

[To check a password](https://www.npmjs.com/package/bcrypt#to-check-a-password):

```javascript
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});
```

Here is the post login handler currently:

```javascript
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
```

Let's update the post login handler with bcrypt.

Refactor post login handler to use bcrypt for password comparing

```javascript
// Route handler for /login path
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username })
    .then(foundUser => {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if (result === true) {
            res.render("secrets");
          }
        }); 
      }
    })
    .catch(error => {
      console.log(error);
    });
});
```

## Testing register and login with bcrypt

1. Run the project with `npm run dev`
2. Open a browser and head to `localhost:3000`
3. Click register
4. On register page, sign up a sample user
  
```sh
Email: MiyukiShiba@gmail.com
Password: TatsuyaShiba
```
5. Check the database to see if the user was created

Confirm if the hashed and salted password for the new user is stored.

In MongoDB:

```json
{"_id":
  {"$oid":"65f7d2e932c6d19099064661"},
  "email":"MiyukiShiba@gmail.com",
  "password":"$2b$10$C3FAb84DggaelXt9Fl9OyeKHAUvJ2E9RfBZ/42Z8STDCW7TgFn4IS",
  "__v":{"$numberInt":"0"}
}
```

6. Return to `localhost:3000` and click the login button. Attempt to login with new user.

In the `localhost:3000/login` route, login with the new user details.

If we get redirected to the secrets page, the bcrypt comparison was successful!

docs: Add detailed guide testing register & login

### Handle error cases in login route

Let's also handle the error cases in the login route.

1. When user not found in the database
2. When bcrypt has an error
3. When passwords do not match

Handle edge & error cases in post login handler

```javascript
// Route handler for /login path
app.post("/login", (req, res) => {
  // Extract username and password from the request body
  const username = req.body.username;
  const password = req.body.password;

  // Find a user document in the database that matches the email
  User.findOne({ email: username })
    .then(foundUser => {
      // If user exists, compare the password with the stored password
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (err) {
            // Handle bcrypt error
            console.error("Error comparing passwords:", err);
            res.status(500).send("Internal server error");
          } else if (result === true) {
            // Passwords match, render the secrets page
            res.render("secrets");
          } else {
            // Passwords do not match, send an error message or redirect
            res.status(401).send("Wrong password");
          }
        });
      } else {
        // If the user does not exist, send an error message or redirect
        res.status(404).send("User not found");
      }
    })
    .catch(error => {
      // Handle any error that occurs during the process
      console.log(error);
      res.status(500).send("Internal server error");
    });
});
```

## Create a backup of the app

Before we modify our current `app.js` file, let's create a backup that stores our app that currently hashes and salts passwords.

feat: Create backup of app.js

This commit adds a backup copy of the main Express app.js file. The backup is stored in a separate directory named 'backups' as 'app.js.bak'. This ensures that we have a safety net in case any changes accidentally break the original file.

- Created a new directory 'backups' within the project root.
- Copied 'app.js' to 'backups/app.js.bak'.
- The application currently uses **hashing and salting** for password authentication.

# Level 5: Cookies and Sessions

The next level of authentication and security is cookies and sessions.

Cookies are more like fortune cookies as they have a message that is packaged inside, can be passed around and broken to reveal a message.

If we put an item in our shopping cart at [Amazon](https://www.amazon.com/), then navigate to a different site without purchasing. We can check our browser's cookies in the settings and see the cookie data. We get a cookie that contains our session ID number.

This `session-id` number can be used to fetch all the things we added to the shopping cart during the browser session.

- [Cookies | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

HTTP cookies, also known as web cookies or browser cookies, are small pieces of data sent from a website and stored on the user's web browser while the user is browsing. They serve several functions:

- **Session Management**: Cookies can keep users logged into a site, track shopping cart items, game scores, or any other data the server should remember.
- **Personalization**: They store user preferences, themes, and other settings.
- **Tracking**: Cookies can record and analyze user behavior, which can be used for marketing or analytics.

When a server sends a web page to a browser, it can also send a cookie. The browser may store this cookie and send it back with subsequent requests to the same server. This way, the server can recognize if two requests came from the same browser, which is useful for maintaining a consistent user experience, like staying logged in on a website.

Cookies can be set to expire after a certain date or time period, and they can be restricted to a specific domain and path, limiting where the cookie is sent. While cookies are essential for many web functionalities, they can also impact performance, especially on mobile data connections, and there are modern storage APIs like the Web Storage API (localStorage and sessionStorage) and IndexedDB recommended for client-side storage.

## Cookie process

1. Browser sends a GET request to a website
2. Server sends a response, including JS files to render site
3. Browser adds a item to the cart, which is equivalent to making a POST request to server
4. Server creates a cookie to identify user with browser
   1. cookie contains data that user wants to buy an item
5. Server sends cookie back as part of the response
6. Browser saves the cookie
7. Next time user makes a request to site, the cookie is sent back along with GET request
8. Cookie allows server to identify who user is, and any previous session they had along with the item they wanted to buy

### Session

Sessions are a type of cookie.

Session: period of time when a browser interacts with a server

When user logs in to a site, that is when the session starts and the cookie is created.

Inside the cookie is the user credentials which verifies that user is logged-in and authenticated. Further access to the website does not need the user to log-in again, as they can check against the active cookie on the browser.

When user logs out, the session ends and the cookie related to the session is destroyed.

## Passport js

- [passportjs](https://www.passportjs.org/)
  
> Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more

### Authentication and Session Management Packages

To enhance our application, we'll install packages that handle sessions and cookies.

1. **[passport](https://www.npmjs.com/package/passport)**: A popular authentication middleware for Node.js applications.
2. **[passport-local](https://www.npmjs.com/package/passport-local)**: A Passport strategy for authenticating with a username and password.
3. **[passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)**: A Mongoose plugin that simplifies building username and password login with Passport.
4. **[express-session](https://www.npmjs.com/package/express-session)**: Middleware for managing sessions in Express applications.

Install all at once:

```sh
npm i passport passport-local passport-local-mongoose express-session
```

Commands to install individually:

```sh
npm install passport

npm install passport-local

npm i passport-local-mongoose

npm i express-session
```

Now let's clean up our `app.js`

- Remove `bcrypt`, `saltRounds` and unused packages
- Clean up the code by removing extra comments
- Empty out app post register handler
- Empty out app post login handler

`app.js`
```js
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'; // eslint-disable-line no-unused-vars
import mongoose from 'mongoose';

/* Constant variables */
const port = 3000;
const app = express();

/* Express middleware */
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true 
}));

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
```

### Import packages in app

Now let's import the packages,

In CommonJS (CJS) require statement:
```javascript
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
```

In ECMAScript Module (ESM) import statemenet:
```javascript
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
```

We do not need to import `passport-local`.

## Create session middleware

Next let's start with `session` and actually use it.

***After*** our express middleware, **but *before*** we connect to the database, create a session middleware with the given options.

```js
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
}));

/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);
```

- `secret` is the secret used to sign the session ID cookie
- `resave`: Forces the session to be saved back to the session store, even if the session was never modified during the request. 
- `saveUninitialized`: Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing `false` is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing `false` will also help with race conditions where a client makes multiple parallel requests without a session.
- `cookie`: Settings object for the session ID cookie.

feat: Create session middleware in app.js

- Added session management packages
- Configured session with secret key

Let's take the extra step and store the secret key as an environment variable.
- Add `SECRET_SESSION_STRING` in `.env` file and set the string
- Use the new key when creating the session

refactor: Use environment variable for session secret

In this commit, the session secret for creating sessions has been refactored to use an environment variable (`process.env.SECRET_SESSION_STRING`). This approach enhances security by keeping sensitive information separate from the codebase. It allows for better management of secrets and reduces the risk of accidental exposure in version control.

```javascript
app.use(session({
  secret: process.env.SECRET_SESSION_STRING,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
```

## Initialize passport

Now right below the session, let's initialize the passport. Then afterwards we want passport to setup our session.

feat: Initialize passport and passport session

In this commit, passport and passport session have been initialized for session management. The `express-session` middleware is used along with `passport` for authentication and user session handling.

```javascript
import session from 'express-session';
import passport from 'passport';

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
}));

app.use(passport.initialize());
app.use(passport.session());

/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);
```

### User session handling with passport local mongoose

- [passport-local-mongoose | npm reference](https://www.npmjs.com/package/passport-local-mongoose)

Next add `passportLocalMongoose` as a plugin to the user schema.

```js
import passportLocalMongoose from 'passport-local-mongoose';

// ...

/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);

// Define a user schema with email and password fields
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);
```

Enabling `passportLocalMongoose` will allow us to hash and salt our passwords and save our users into our mongoDB.

Next add the simplified passport/passport-local configuration

1. We have to create a strategy
2. Serialize user
3. Deserialize user

Serialize/deserialize is only necessary when using sessions.

Serialize the user creates the cookie which contains the user identifications.
Deserialize allows passport to open the cookie and read the information within to identify the user.

feat: Set up passportLocalMongoose and user session handling

In this commit, passportLocalMongoose has been set up for user authentication. The user schema includes email and password fields. Additionally, the passport strategy, serializeUser, and deserializeUser functions have been configured for user session management.

```js
/* Connect to Database */
mongoose.connect(process.env.MongoDB_Connection_String);

// Define a user schema with email and password fields
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

// Create a user model from the user schema
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

## Setup POST routes

With the configurations to setup cookies and sessions we should now be able to implement our routes. 

- [passport-local-mongoose | Examples section](https://www.npmjs.com/package/passport-local-mongoose#examples-1)
- Here is the content of the link above:

To allow only "active" users to authenticate

First, we define a schema with an additional field `active` of type Boolean.

```javascript
const UserSchema = new Schema({
  active: Boolean
});
```

When plugging in Passport-Local Mongoose, we set `usernameUnique` to avoid creating a unique mongodb index on field `username`. To avoid non active users being queried by mongodb, we can specify the option `findByUsername` that allows us to restrict a query. In our case we want to restrict the query to only query users with field `active` set to `true`. 

The `findByUsername` MUST return a Mongoose query.

```javascript
UserSchema.plugin(passportLocalMongoose, {
  // Set usernameUnique to false to avoid a mongodb index on the username column!
  usernameUnique: false,

  findByUsername: function(model, queryParameters) {
    // Add additional query parameter - AND condition - active: true
    queryParameters.active = true;
    return model.findOne(queryParameters);
  }
});
```

To test the implementation, we can simply create (register) a user with field active set to false and try to authenticate this user in a second step:

```javascript
const User = mongoose.model('Users', UserSchema);

User.register({username:'username', active: false}, 'password', function(err, user) {
  if (err) { ... }

  const authenticate = User.authenticate();
  authenticate('username', 'password', function(err, result) {
    if (err) { ... }

    // Value 'result' is set to false. The user could not be authenticated since the user is not active
  });
});
```

### Register POST route

feat: Implement registration POST route

This commit adds the registration functionality to the Express app. It includes session management, database connection, and user authentication using Passport.js.

Changes made:
- Set up middleware for static files and EJS templates.
- Configured session handling with secure cookies.
- Initialized Passport for authentication.
- Defined a user schema with email and password fields.
- Created a user model from the schema.
- Implemented registration route that registers users and redirects to the secrets page upon successful authentication.

```javascript
app.post("/register", (req, res) => {

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});
```

#### Secrets GET route

Notice we redirect the user to the "/secrets" route. Previously, we did not implement this route because we relied on `res.render()` to render the secrets page within the register or login page.

But because we are authenticating the user and setting up a logged-in session for them, then they should be automatically be able to view the secrets page if they are still logged-in.

feat: Implement secrets GET route

This commit adds the secrets route to the Express app. If the user is authenticated, it renders the 'secrets' view; otherwise, it redirects to the login page.

```javascript
app.get("/secrets", (req, res) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
}); 
```

#### Test register and secrets routes

Now we can test the routes. 

1. In the terminal, run the server.

```sh
npm run dev
```

2. Register a new user

```sh
Email: TatsuyaShiba@gmail.com
Password: MiyukiShiba
```

User will be created in the database and redirected to the secrets page.

3. Check the database for the document created in the collection

We can see the newly created user has a `username`, `salt`, and `hash` fields. It also has private fields `_id` and `__v`.

The `salt` and `hash` are done automatically by `passport-local-mongoose`.

4. Check if session is preserved

- Navigate to `localhost:3000` the home page
- Navigate back to `localhost:3000/secrets`

The secrets page is rendered right away without neeeding to login because user is already authenticated.

5. Check the cookie saved in browser session

Go to Chrome settings > Content Settings > Cookies > See all cookies and site data

- Locate `localhost`
- One cookie is found named `connect.sid` which saves our session
- This cookie is created by `express-session` package
- Set to expire when browsing session ends

6. Remove the cookie and access secrets page again

If we reset our session by ending the browser session (close Chrome) or deleting the cookie, and then access the secrets page again the user will not be authenticated. It will redirect us back to the login page.

### Login POST route

- [Log In | Passportjs](https://www.passportjs.org/concepts/authentication/login/)

Passport exposes a `login()` function on `req` (also aliased as `logIn()`) that can be used to establish a login session.

```javascript
req.login(user, function(err) {
  if (err) { return next(err); }
  return res.redirect('/users/' + req.user.username);
});
```

When the login operation completes, `user` will be assigned to `req.user`.

Note: `passport.authenticate()` middleware invokes `req.login()` automatically. This function is primarily used when users sign up, during which `req.login()` can be invoked to automatically log in the newly registered user.

Let's implement the POST route. On login, create a user with the login credentials. Then autenticate that user with `passport`.

feat: Implement user login route

This commit adds a new route for user login. When a POST request is made to "/login", the provided username and password are used to authenticate the user. If successful, the user is redirected to the "/secrets" page.

```javascript
app.post("/login", (req, res) => {
  // Create a new user
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  // Use passport to log-in the user
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});
```

#### Walkthrough of login POST route

1. User logins in with credentials in login route
2. Then `passport.authenticate` sends a cookie to browser which it will hold onto
3. Cookie will authenticate and allow the user to view authorized pages

docs: Add walkthrough for login POST route

This commit includes a detailed walkthrough for the login POST route. It explains the user authentication process, the role of `passport.authenticate`, and how cookie-based authentication works.

In detail,

1. **User Authentication Process**:
   - The user submits their login credentials (username and password) via the login route.
   - The server receives the credentials and processes them.

2. **Passport Authentication**:
   - The `passport.authenticate` middleware is invoked.
   - If the credentials are valid, Passport generates an authentication cookie.
   - This cookie is sent to the user's browser, where it is stored.

3. **Cookie-Based Authentication**:
   - The browser holds onto the authentication cookie.
   - For subsequent requests, the browser automatically includes this cookie.
   - The server uses the cookie to verify the user's identity.
   - If the cookie is valid, the user is granted access to authorized pages (e.g., the "/secrets" page).

This process ensures secure and seamless user authentication within the application.

## Add logout route to deauthenticate users

docs: Add logout route to deauthenticate users

This commit introduces a logout route that deauthenticates users, ensuring they are securely logged out. 

- [Log out | Passportjs](https://www.passportjs.org/concepts/authentication/logout/)

Passport exposes a `logout()` function on `req` (also aliased as `logOut()`) that can be called from any route handler which needs to terminate a login session. Invoking `logout()` will remove the `req.user` property and clear the login session (if any).

It is a good idea to use POST or DELETE requests instead of GET requests for the logout endpoints, in order to prevent accidental or malicious logouts.

feat: Implement logout route

This commit adds a logout route that deauthenticates users. Upon successful logout, users are redirected to the home page.

```javascript
app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
```

## Backup version 5 of authentication app

feat: Add v5 full backup of auth app

This commit adds a full working backup copy of authentication app. The backup is stored in a separate directory named 'backups/v5' and in 'auth-app-v5.zip'. This preserves a full working version of the authentication application implemented with sessions and cookies. This also ensures that we have a safety net in case any breaking changes happen during the development of a newer version.

- Created a new directory 'backups/v5' within the project root.
- Copied a full working version 5 where user can register, login securely with authentication.
- User can create and read a message.
- The application uses **cookies and session** for password authentication.

# Level 6: OAuth - Open Authorization

Resources:

- [https://developers.google.com/identity/protocols/oauth2/](https://developers.google.com/identity/protocols/oauth2/)
- [passport-google-oatuh20](https://www.passportjs.org/packages/passport-google-oauth20/)

## What is **OAuth**?

- **OAuth (Open Authorization)** is an open standard for token based authorization
- **OAuth (Open Authorization)** is an open standard for access delegation, commonly used as a way for internet users to grant websites or applications access to their information on other websites but without giving them the passwords. [Source: Wikipedia](https://en.wikipedia.org/wiki/OAuth)
- **OAuth (Open Authorization)** is an open standard protocol that facilitates authorization for applications to access user information. Here's how it works:

1. **Access Delegation**: OAuth allows internet users to grant websites or applications access to their information on other websites **without** sharing their passwords. Instead of revealing login credentials, OAuth enables a secure way for users to delegate access to their data.

2. **Resource Owner and Client**: In the OAuth process, the **resource owner** (the user) authorizes a **client application** (such as a website or app) to access specific resources (like user profiles or data) hosted by a **resource server** (another website or service).

3. **Access Tokens**: When a user authorizes access, the authorization server issues an **access token** to the client application. This token acts as a credential that the client can use to access the protected resources on behalf of the user.

4. **Resource Server Interaction**: The client application presents the access token to the resource server. If valid, the resource server grants access to the requested resources.

5. **Common Use Cases**: OAuth is widely used by companies like Amazon, Google, Microsoft, and Twitter. For example, when you log in to a third-party app using your Google account, OAuth enables the app to access your Google profile without knowing your Google password.

In summary, OAuth provides a secure way for users to share their account information with third-party services, enhancing privacy and security while allowing seamless integration between different platforms.

### Why **OAuth**?

**OAuth** allows us to access specific information on third-party websites without sharing our passwords directly. By delegating password management to these third-party companies, OAuth enhances security. As a result, our liability decreases when our users' sensitive data is exposed.

**OAuth** is special in 3 ways.

1. Granular Access Levels
2. Read/Read+Write Access
3. Revoke Access

Granular Access Levels

- When a user logs in using a third-party service like GitHub or Google, we have the ability to request **specific pieces of information** from their accounts.
- For instance, if our app only requires access to the user's **profile and email address**, we can limit our request to just those details. Alternatively, we might ask for additional data, such as their **list of friends**.
- The term **granular** refers to breaking down access into smaller, more precise components. In this context, **granularity** allows app developers to precisely determine the type of data they need from the user's third-party account, tailoring their requests accordingly.

Read/Read+Write Access

- **OAuth** provides two levels of access:
    - **Read-only access**: With this level, we can retrieve information from a user's account without the ability to modify or write any data.
    - **Read+Write access**: In contrast, this level allows us to both retrieve information and make changes to a user's account. For instance, we could post information on a user's third-party account.

Revoke Access

- When using a third-party service for user authentication, it's essential that the user has the ability to **revoke access** at any time. 
- For instance, if a user authenticates with Google, they should be able to visit their Google account settings and **deauthorize** the access they previously granted to your application or website. 
- This way, users don't need to navigate to your website specifically to manage access permissions, making the process more straightforward and user-friendly.

### Steps to integrate OAuth in app

1. **Application Setup and Registration:**
   - Begin by setting up your application in the respective third-party developer console (e.g., Google, Facebook, GitHub).
   - Retrieve the **App ID** or **Client ID** provided by the third-party service. This unique identifier will be used to establish communication between your app and the service.

2. **Redirect to Authentication:**
   - When a user makes a request to your application, provide them with the option to log in using the third-party service.
   - Redirect the user to the third-party authentication page, where they can log in with their own credentials.

3. **User Authentication:**
   - The user logs in with OAuth using their credentials from the third-party service.
   - The third-party service validates the user's identity and returns an **authorization code** to your app.

4. **Permission Granting:**
   - The user reviews the permissions your application is requesting (e.g., access to their profile and email address).
   - Upon approval, the user grants the necessary permissions.

5. **Receive Authorization Code:**
   - Your web app receives the authorization code from the third-party service.
   - This code allows your app to verify and authenticate the user. You can then log them into your website.

6. **Exchange Auth Code for Access Token:**
   - Your web app exchanges the authorization code for an **access token** from the third-party service.
   - Store this token securely in your database. It will be used to make subsequent requests for user information.
   - Note that access tokens are valid for a longer duration than authentication tokens.

To recap:

1. **Application Setup and Registration:**
   - Begin by setting up your application in the respective third-party developer console (e.g., Google, Facebook, GitHub).
   - Retrieve the **App ID** or **Client ID** provided by the third-party service. This unique identifier will be used to establish communication between your app and the service.

2. **Client-Side Authentication Flow:**
   - Your website (the client) will initiate the OAuth flow by redirecting the user to the third-party authentication page.
   - The user will log in or authorize your app to access their account on the third-party service.
   - Upon successful authentication, the third-party service will redirect the user back to your app with an **authorization code**.

3. **Server-Side Token Exchange:**
   - Your app's server will receive the authorization code from the client.
   - Use this code to make a secure request to the third-party service's token endpoint.
   - In response, you'll receive an **access token** and optionally a **refresh token**.
   - Store the access token securely, as it will be used to make authenticated requests on behalf of the user.

4. **Accessing User Data:**
   - With the access token, your app can now access the user's data (e.g., profile information, email, etc.) from the third-party service's APIs.
   - Make API requests using the token as an authorization header.

5. **Handling Token Expiry and Refresh:**
   - Access tokens have a limited lifespan. Monitor their expiration and refresh them using the refresh token when needed.
   - If the refresh token is also expired, prompt the user to re-authenticate.

6. **Logout and Deauthorization:**
   - Implement a logout mechanism that clears the user's session and revokes the access token.
   - Consider handling deauthorization scenarios (e.g., if the user disconnects your app from their third-party account).

Remember to consult the specific documentation for the third-party service you're integrating with, as each service may have unique requirements and endpoints.

## Use passport-google-oauth20

feat: Add passport strategy for Google OAuth 2.0

In passport.js, we select the strategy [passport-google-oatuh20](https://www.passportjs.org/packages/passport-google-oauth20/).

**Usage**

Create an Application

Before using `passport-google-oauth20`, you must register an application with Google. If you have not already done so, a new project can be created in the [Google Developers Console](https://console.developers.google.com/). Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.

Configure Strategy

The Google authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The client ID and secret obtained when creating an application are supplied as options when creating the strategy. The strategy also requires a `verify` callback, which receives the access token and optional refresh token, as well as `profile` which contains the authenticated user's Google profile. The `verify` callback must call `cb` providing a user to complete authentication.

Let's implement these in our app.

## **Create an application in Google Developers Console**

- https://console.developers.google.com/
- In your Google account, create a project named "**Secret** and click **CREATE**.
- Back in the dashboard, after it is finished loading click on the `OAuth consent screen` on the left pane.
  - For now click **External**, for **User Type**. Then click **CREATE** to make the user consent screen.
  
Now in the **OAuth consent screen**, we need to configure the app information.

- **App name**: Secrets
- **User support email**: add your email
- **App logo** (Optional)
- **App domain**: Leave these blank for now.
- Save and continue 

Now we proceed to the **Scopes** screen.

- Add a scope
- All we need are the default ones that do not require an API to call:
  - email, `./auth/userinfo.email`
  - profile, `./auth/userinfo.profile`
  - openid, `openid`
- Finally, add the scopes
- To add more scopes to the screen you must find and enable the API in the [Google API Library](https://console.cloud.google.com/apis/library?project=secret-425104&supportedpurview=project)
- Additional scopes allow developers to retrieve more data from the user such as youtube analytics, map location data and more through the use of different APIs.
- The user will not have to go through a permissions page when we only take the email, profile and openid
- Save and continue

Add **Test Users** page.

- Add test users to test the OAuth application
- Press **+ Add Users** button
- Input an email address in the input field
- Click **Add**
- Close the add user pane
- Save and continue

Finalize the app registration. 

Review the summary and click **Back to Dashboard.**

## Create API Credentials

Back in the Google Developers Console, click **Credentials** in the left pane.

- Click **+ Create Credentials**
- Select **OAuth client ID**
- Select **Web application** for **Application type**
- Set the **Name** to **Secrets**

Now we need to set up the domains of the URIs. There are two categories:
1. **Authorized JavaScript origins**
  - Add the URI `http://localhost:3000` to JavaScript origins
2. **Authorized redirect URIs**
  - The redirect URI is the route on our server when Google has authenticated our user to return to so that we can locally authenticate them
  - Add the URI `http://localhost:3000/auth/google/secrets`

Now click **Create** to create the OAuth client.

We should get two values, **OAuth Client ID** and **OAuth Client Secret**.

Add API Credentials to `.env`

```.env
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_STRING
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_STRING
```

## Configure strategy to auth app

Now back to our authentication app, let's ensure we have the package `passport-google-oauth20`.

**Install**

```sh
npm install passport-google-oauth20
```

Now use the module to authenticate with Google using the OAuth 2.0 API. It takes two parts: the `GoogleStrategy` import and configuration of the google strategy with passport.

```javascript
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

For increased clarity we can comment the code to dissect the two main parts of the code here.

```js
// Import the Google OAuth 2.0 authentication strategy from the 'passport-google-oauth20' package
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Passport to use the Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID, // Your Google API client ID
    clientSecret: GOOGLE_CLIENT_SECRET, // Your Google API client secret
    callbackURL: "http://www.example.com/auth/google/callback" // The callback URL after successful authentication
  },
  function(accessToken, refreshToken, profile, cb) {
    // This function is called when a user successfully authenticates with Google
    // 'accessToken' and 'refreshToken' are tokens provided by Google
    // 'profile' contains information about the authenticated user (e.g., ID, email, name)
    // 'cb' is a callback function to handle any errors and return the user object

    // In this example, we're using a hypothetical 'User' model to find or create a user based on their Google ID
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user); // Return the user object (or an error) to Passport
    });
  }
));
```

Now let's do it for our app.

1. Import the Google OAuth 2.0 strategy


For CJS:

```js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
```

For ES modules, use ES6 import syntax:

refactor(auth): use ES6 import for GoogleStrategy

Replace the CommonJS require statement with an ES6 import for the GoogleStrategy class from 'passport-google-oauth20'.

```js
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
```

2. Configure passport with Google OAuth 2.0 strategy

Now after all of the set-up (so after the line `passport.deserializeUser...`) and before all of the routes (before the line `app.get("/")...`) configure passport with the OAuth strategy.

feat: Configure Passport with Google OAuth2.0

```js
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

Now interpolate the relevant variables within the object passed into `GoogleStrategy`.

feat: Configure GoogleStrategy with env variables

- Interpolate the relevant variables (clientID and clientSecret) within the object passed into GoogleStrategy
- The callbackURL is set to "http://localhost:3000/auth/google/secrets"

```javascript
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

### Issue: Due to Google deprecating Google Plus APIs, need to handle new userinfo endpoint

[passport google oauth2 - fix: handle new userinfo endpoint #51](https://github.com/jaredhanson/passport-google-oauth2/pull/51)

  "Google is deprecating and completely removing the Google Plus APIs early next year. The easiest migration path for users of this module is to provide `userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'`, in the strategy options (use the oauth userinfo endpoint instead of G+). This mostly works in its current state."

To fix, we need to provide `userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',` in the strategy options (use the oauth userinfo endpoint instead of G+).

feat: Use userinfo instead of G+ for user data

fix: Handle new userinfo endpoint in strategy

Add `userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'` to the GoogleStrategy options to use the OAuth userinfo endpoint instead of G+.

```javascript
// Fix based on PR #51: https://github.com/jaredhanson/passport-google-oauth2/pull/51
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

### Breakdown the code

Take a step back and let's analyze the code that configures the Google authentication strategy.

```javascript
passport.use(new GoogleStrategy({
  // Configuration options...
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

We passed in the configuration options when instantiating the `GoogleStrategy`. 

Then we have an anonymous function with the parameters: `accessToken, refreshToken, profile, cb`. It serves as the callback function for handling Google authentication.

1. `(accessToken, refreshToken, profile, cb)`: These are the parameters (arguments) of the function. Let's look at each one:
   - `accessToken`: Represents the access token obtained from Google after successful authentication. It allows the application to access the user's Google resources.
   - `refreshToken`: Represents the refresh token, which can be used to obtain a new access token when the current one expires.
   - `profile`: Contains information about the authenticated user's profile (e.g., ID, name, email, etc.).
   - `cb`: Stands for "callback." It's a function that you'll call once you've processed the authentication data. Typically, you pass an error (if any) and the user object to this callback.

2. Inside the function:
   - You'll find the logic for handling the user's data. In this case, it's using the `User.findOrCreate` method to find or create a user based on their Google ID.
   - The `err` parameter is used to handle any errors that might occur during the process.
   - The `user` parameter represents the user object returned from the database (or created if it doesn't exist).

Overall, this function is part of the Passport.js authentication flow and is executed when a user logs in via Google OAuth. It processes the authentication data and interacts with the application's database or user management system.

Again to put it simply:

1. `accessToken` allows us to get data related to the user
2. `refreshToken` allows us to access the user's data for a longer period of time
3. `profile` contains the user information
4. `cb` callback function

Inside the function we use the data we get back to either:

   - find the user with that ID OR 
   - create the user with that ID

#### Issue: `User.findOrCreate` is not a function in passport

- [User.findOrCreate is not a function | stackoverflow](https://stackoverflow.com/questions/33682152/user-findorcreate-is-not-a-function-passport-facebook)
- [User.findOrCreate is not a function | passport-google-oatuh2 GitHub](https://github.com/jaredhanson/passport-google-oauth2/issues/69)

Notice that the `User.findOrCreate` that is called is not from MongoDB, Mongoose or passport.

It's actually [**pseudocode**](https://en.wikipedia.org/wiki/Pseudocode#:~:text=In%20computer%20science%2C%20pseudocode%20is,notation%20of%20actions%20and%20conditions.), which describes the steps in an algorithm using a mix of conventions from programming languages along with informal (usually self-explanatory) notation for actions and conditions.

In short, `User.findOrCreate` is not a function but pseudocode for some functionality that we are supposed to implement. In this case we need to find or create a user.

#### Fix: Use mongoose-findorcreate

However we can use [mongoose-findorcreate package](https://www.npmjs.com/package/mongoose-findorcreate) to make the function `User.findOrCreate()` work.

**Usage**:

```js
var findOrCreate = require('mongoose-findorcreate')
var ClickSchema = new Schema({ ... });
ClickSchema.plugin(findOrCreate);
var Click = mongoose.model('Click', ClickSchema);
```

Let's adapt this code to fit our application.

  - Convert that to ES Module import.
  - Declare the schema (we already have `userSchema`)
  - Add `findOrCreate()` as a plugin to the schema
  - Use `findOrCreate()` to handle the user data

feat(auth): import findOrCreate and use as plugin

Add findOrCreate as a plugin to the userSchema. Handle user data using the provided GoogleStrategy function.

```js
import findOrCreate from 'mongoose-findorcreate';

userSchema.plugin(findOrCreate);

mongoose.connect(process.env.MongoDB_Connection_String);

// Define a user schema with email and password fields
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// ...
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

## Implement OAuth front-end

Currently, there is no means for the user to log in via Google OAuth. It only works for the local authentication route.

Navigate to `/views/register.ejs` and add the following code:

feat: Add Google OAuth sign-up button

`\app\views\register.ejs`
```html
<!-- ... -->
    <!-- Google OAuth sign-up button -->
    <div class="col-sm-4">
      <div class="card social-block">
        <div class="card-body">
          <a class="btn btn-block" href="/auth/google" role="button">
            <i class="fab fa-google"></i>
            Sign Up with Google
          </a>
        </div>
      </div>
    </div>

```

Similarly, for the login page:

feat: Add Google OAuth sign-in button

`\app\views\login.ejs`
```html
<!-- ... -->
    <!-- Google OAuth sign-in button -->
    <div class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <a class="btn btn-block" href="/auth/google" role="button">
            <i class="fab fa-google"></i>
            Sign In with Google
          </a>
        </div>
      </div>
    </div>
```

Notice that for both buttons we set the `href` to `/auth/google`. When the user clicks on the button it makes a GET request to the path `/auth/google`.

### Implement GET route for `/auth/google`

feat: Implement authenticate GET route in auth app

- [passport-google-oauth20 reference](https://www.passportjs.org/packages/passport-google-oauth20/)

Use `passport.authenticate()`, specifying the `'google'` strategy, to authenticate requests

feat: Add Google authenticate route using Passport

In this commit, we've added an authentication route for Google using Passport. The route is accessible at "/auth/google". When users visit this endpoint, they will be redirected to Google for authentication. The scope is set to retrieve the user's profile information.

```js
app.get("/auth/google", (req, res) => {
  passport.authenticate("google", { scope: ["profile"] });
});
```

This will redirect the user to sign in to their Google account.

Now try registering or logging in through Google. We then get an error:

```sh
Cannot GET /auth/google/secrets
```

That's the endpoint we set in the google developers console. Its under the **Authorized redirect URIs**, this is where Google send the user after they've been authenticated on the Google server.

### Implement GET route for `/auth/google/secrets`

Now we need to add the route `/auth/google/secrets` to be able to authenticate them locally on our website and to save their login session using session and cookies.

After Google has successfully authenticate the user on their servers, they will send them to the URI we specified `/auth/google/secrets`. If the authentication fails we redirect them to the login route. If authentication is successful we redirect them to the secrets route.

feat: Add callback route to authenticate requests

In this commit, we've added an authentication route for Google using Passport. The route is accessible at "/auth/google/secrets". When users visit this endpoint, they will be redirected to Google for authentication. If the authentication fails, they will be redirected to "/login". Upon successful authentication, they will be redirected to the "/secrets" page.

```js
app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
});
```

## Trace App Execution

1. When the user clicks on the Google sign-up button:
   - The app directs them to the "/auth/google" route.
   - Authentication is initiated using Passport and the Google strategy.
   - The user is authenticated on Google servers, requesting their profile information.

2. Upon successful authentication, Google redirects them to "/auth/google/secrets":
   - In this route, local authentication takes place, and the login session is saved.
   - The callback function for the `GoogleStrategy` is invoked, attempting to create the user in our database.

3. If local authentication is successful, the user is redirected to "/secrets".

### Error: Failed to serialize user into session

After testing the app again we may get the error:

```sh
Error: Failed to serialize user into session
```

This could be related to these lines of code:

```js
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

Which comes from the [npm passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose) package.

This comes into conflict with how Passport serializes/desiralizes users.

- [passportjs authentication sessions](https://www.passportjs.org/concepts/authentication/sessions/)

To maintain a login session, Passport serializes and deserializes user information to and from the session. The information that is stored is determined by the application, which supplies a `serializeUser` and a `deserializeUser` function.

feat: Handle failed user serialization

Now replace the code for local authentication:

```js
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

And use the passport's serializeUser/deserializeUser so that it can work for any kind of authentication:

```js
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, cb) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
```

fix: Update user serialization and deserialization

```js
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, cb) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
```

## Sessions in passport

docs: Enable session-based state management

This commit documents how to maintain state between the application server and the user's browser through sessions.

[Authentication and Sessions | Passport.js docs](https://www.passportjs.org/concepts/authentication/sessions/)

A web application needs the ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is known as a session.

HTTP is a stateless protocol, meaning that each request to an application can be understood in isolation - without any context from previous requests. This poses a challenge for web applications with logged in users, as the authenticated user needs to be remembered across subsequent requests as they navigate the application.

To solve this challenge, web applications make use of sessions, which allow state to be maintained between the application server and the user's browser. A session is established by setting an [HTTP cookie](https://en.wikipedia.org/wiki/HTTP_cookie) in the browser, which the browser then transmits to the server on every request. The server uses the value of the cookie to retrieve information it needs across multiple requests. In effect, this creates a stateful protocol on top of HTTP.

While sessions are used to maintain authentication state, they can also be used by applications to maintain other state unrelated to authentication. Passport is carefully designed to isolate authentication state, referred to as a login session, from other state that may be stored in the session.

Applications must initialize session support in order to make use of login sessions. In an [Express](https://expressjs.com/) app, session support is added by using [`express-session`](https://github.com/expressjs/session) middleware.

- Install package `express-session`

```sh
npm install express-session
```

```sh
import session from 'express-session';

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
```

To maintain a login session, Passport serializes and deserializes user information to and from the session. The information that is stored is determined by the application, which supplies a `serializeUser` and a `deserializeUser` function.

```js
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

1. **`serializeUser` Function**:
   - This function is part of Passport.js, a popular authentication middleware for Node.js.
   - It's used to serialize a user object (typically from a database) into a format that can be stored in a session.
   - The `process.nextTick` function ensures that the callback is executed asynchronously.
   - Inside the callback:
     - The `user.id`, `user.username`, and `user.picture` properties are extracted.
     - These properties are then bundled into an object and passed to the `cb` (callback) function.
   - The `cb` function is called with `null` (no error) and the serialized user data.

2. **`deserializeUser` Function**:
   - This function is the counterpart to `serializeUser`.
   - It deserializes the user data stored in the session back into a user object.
   - Again, `process.nextTick` ensures asynchronous execution.
   - Inside the callback:
     - The `user` argument contains the serialized user data.
     - The callback simply returns this user object via `cb`.

3. **Overall Purpose**:
   - These functions are essential for maintaining user sessions during authentication.
   - `serializeUser` prepares user data for storage in the session.
   - `deserializeUser` retrieves the user data from the session when needed.

What's the difference between first set and second set of code?

```js
/* First set */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, cb) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/* Second set */
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
```

1. **First Set (Original Functions)**:
   - `passport.serializeUser`:
     - Takes a `user` object and a `done` callback.
     - Serializes the user by storing only the `user.id` in the session.
     - The `done` callback is called with `null` (no error) and the serialized user ID.
   - `passport.deserializeUser`:
     - Takes a `user` object and a `cb` callback.
     - Retrieves the user from the database using `User.findById(id, ...)`.
     - The `cb` callback is called with any errors (`err`) and the retrieved user.

2. **Second Set (Your Updated Functions)**:
   - `passport.serializeUser`:
     - Takes a `user` object and a `cb` callback.
     - Serializes the user by creating an object with `id`, `username`, and `picture`.
     - The `cb` callback is called with `null` (no error) and the serialized user data.
   - `passport.deserializeUser`:
     - Takes a `user` object and a `cb` callback.
     - Simply returns the `user` object (no database lookup needed).

3. **Key Differences**:
   - The updated functions store additional user properties (`username` and `picture`) during serialization.
   - In the original functions, deserialization involved a database lookup (`User.findById(id, ...)`), while the updated functions directly return the user object.

The choice of what to store during serialization depends on your application's requirements. If you need more user information in the session, the updated approach is preferable. Otherwise, the original approach is simpler and more lightweight.

feat: Improve user serialization & deserialization

- Store additional user properties (`id`, `username` and `picture`) during serialization
- Optimize deserialization by directly returning the user object, eliminating the need for a database lookup

### Establish login session

docs: Implement login session & explore tradeoffs

A login session is established upon a user successfully authenticating using a credential. The following route will authenticate a user using a username and password. If successfully verified, Passport will call the `serializeUser` function, which in the above example is storing the user's ID, username, and picture. Any other properties of the user, such as an address or birthday, are not stored.

```js
app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });
```

As the user navigates from page to page, the session itself can be authenticated using the built-in `session` strategy. Because an authenticated session is typically needed for the majority of routes in an application, it is common to use this as [application-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application), after `session` middleware.

```sh
app.use(session(/* ... */);
app.use(passport.authenticate('session'));
```

This can also be accomplished, more succinctly, using the passport.session() alias.

```js
app.use(session(/* ... */);
app.use(passport.session());
```

When the session is authenticated, Passport will call the `deserializeUser` function, which in the above example is yielding the previously stored user ID, username, and picture. The `req.user` property is then set to the yielded information.

There is an inherent tradeoff between the amount of data stored in a session and database load incurred when authenticating a session. This tradeoff is particularly pertinent when session data is stored on the client, rather than the server, using a package such as `cookie-session`. Storing less data in the session will require heavier queries to a database to obtain that information. Conversely, storing more data in the session reduces database queries while potentially exceeding the maximum amount of data that can be stored in a cookie.

This tradeoff is controlled by the application and the `serializeUser` and `deserializeUser` functions it supplies. In contrast to the above example, the following example minimizes the data stored in the session at the expense of querying the database for every request in which the session is authenticated.

```js
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user.id);
  });
});

passport.deserializeUser(function(id, cb) {
  db.get('SELECT * FROM users WHERE id = ?', [ id ], function(err, user) {
    if (err) { return cb(err); }
    return cb(null, user);
  });
});
```

To balance this tradeoff, it is recommended that any user information needed on every request to the application be stored in the session. For example, if the application displays a user element containing the user's name, email address, and photo on every page, that information should be stored in the session to eliminate what would otherwise be frequent database queries. Specific routes, such as a checkout page, that need additional information such as a shipping address, can query the database for that data.

### Summary of sessions with express and passport

- **Session Authentication and User Serialization:**
  - When a session is authenticated, Passport calls the `deserializeUser` function.
  - In the example, this function yields the previously stored user ID, username, and picture.
  - The `req.user` property is then set with this yielded information.

- **Tradeoff Between Session Data and Database Load:**
  - There's a tradeoff between session data size and database load during authentication.
  - Storing less data in the session requires heavier database queries.
  - Storing more data reduces queries but may exceed cookie storage limits.

- **Controlled by `serializeUser` and `deserializeUser`:**
  - The application's `serializeUser` and `deserializeUser` functions determine this tradeoff.
  - The second example minimizes session data but queries the database for every authenticated request.

- **Recommendation:**
  - Store essential user information (needed on every request) in the session.
  - For specific routes (e.g., checkout), query the database for additional data.

## User information

feat: Parse and use Google OAuth user data in app

Let's trace the program again, we can log in via Google OAuth and the user will be authenticated. They will be redirected to a URL we specified, in our case the secrets page. Then with the added the log statements:

```js
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
```

In the console we can see that we logged the Google profile that we were sent after the user has been authenticated by Google. It is a json object with various properties such as `id`, `name`, `photos` and more.

What we should save in our database is the `id`, which identifies them the next time they try to log in. We will associate any data the user created on our website with this `id`. 

