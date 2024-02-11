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