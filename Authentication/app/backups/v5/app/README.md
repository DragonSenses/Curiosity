# Quick Start

This is a simple authentication app that allows users to login and register securely with cookies and sessions.

This app uses: node.js, express.js, passport.js, mongoose and bcrypt. See `package.json` for more details.

## Run the app locally

### 1. Create an `.env` file with the following variables:

```sh
# My MongoDB Connection String
MongoDB_Connection_String=""

# Secret session string
SECRET_SESSION_STRING=""
```

Fill the empty quotation marks ("") with the proper strings.

- To find your `MongoDB_Connection_String` you can follow the steps in [Local User Database](#local-user-database) or consult the documentation [Connection Strings | MongoDB reference](https://www.mongodb.com/docs/manual/reference/connection-string/)
- You can set `SECRET_SESSION_STRING` to anything you want, or you can use an encryption key for improved security.

Tip: You can use a site to generate an encryption key for you such as [randomkeygen.com](https://randomkeygen.com/)


### 2. Install dependencies

In the terminal or shell, change directory to the root of the project.

```sh
cd /app
```

Install dependencies with the command:

```sh
npm install
```

### 3. Run the project

```sh
node app.js
```

or

```sh
npm run dev
```

To run the app on port 3000.

### 4. View the app

Navigate to your favorite browser and put input in the address URL bar:

```sh
localhost:3000
```

# Local User Database

1. Install MongoDB on your machine
2. With a fresh standalone installation probably has no access control configured yet. The connection string is: `mongodb://localhost:27017`
3. Otherwise, you have to provide username, password and auth source database in the connection string, e.g. `mongodb://username:password@localhost:27017/?authSource=admin`

## Online database using Atlas

Setup the database on MongoDB's database service: Atlas.

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