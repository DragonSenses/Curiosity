# PostgreSQL

## Summary

**PostgreSQL** is an advanced, enterprise-class, and open-source **relational database system**. 

Here are the key points about PostgreSQL:

1. **Relational and Non-Relational**:
   - PostgreSQL supports both **SQL (relational)** and **JSON (non-relational)** querying.
   - It provides a flexible environment for managing structured data as well as handling semi-structured and unstructured data.

2. **Stability and Community Development**:
   - PostgreSQL is highly stable and reliable, backed by more than **20 years of development** by the open-source community.
   - Unlike some proprietary databases, it is not controlled by any corporation or private entity.

3. **Features**:
   - It extends the SQL language with powerful features, including **window functions**, **advanced indexing**, **full-text search**, and **geospatial capabilities**.
   - PostgreSQL can handle complex data workloads, making it suitable for various applications.

PostgreSQL is a robust and versatile database system that combines the best of both relational and non-relational worlds, making it a popular choice for developers and data professionals.

References:

- PostgreSQL: About. https://www.postgresql.org/about/
- What is PostgreSQL?. https://www.postgresqltutorial.com/postgresql-getting-started/what-is-postgresql/
- en.wikipedia.org. https://en.wikipedia.org/wiki/PostgreSQL

## Installation

- [Set up a local postgresql database | Prisma](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)

To install on Windows

1. Get [Windows postgresql installer](https://www.postgresql.org/download/windows/), get the Windows x86-64
2. Go through the installer steps
3. Confirm a password for the PostgreSQL superuser called `postgres`
   - Write this password down physically somewhere to be used later
4. Setup port (default at 5432)
5. Default locale
6. Review the pre installation summary log (can be found in the directory "C:\Program Files\PostgreSQL\16\installation_summary.log" )
7. Finish installation
8. Skip or cancel Stack Builder

### Self-managed PostgreSQL

The most flexible and simplest to describe option is self-hosting your PostgreSQL server. Self-hosting PostgreSQL means that you install and configure your databases on computers that you control, just like any other piece of software. Self-hosting gives you a lot of choice as to where you will install and run your databases.

### Installing PostgreSQL on your local development computer

- [Install PostgreSQL on local computer](https://www.prisma.io/dataguide/postgresql/5-ways-to-host-postgresql#installing-postgresql-on-your-local-development-computer)

For early development, testing, and proof of concepts, installing PostgreSQL on your local development machine can provide reliable, easy to manage access to your databases.

<table>
  <thead>
    <tr>
      <th>Hosting Option</th>
      <th>Local development machine</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Project stage</strong></td>
      <td>Development</td>
    </tr>
    <tr>
      <td><strong>Cost</strong></td>
      <td>No additional costs</td>
    </tr>
    <tr>
      <td><strong>Performance</strong></td>
      <td>Low</td>
    </tr>
    <tr>
      <td><strong>Scalability</strong></td>
      <td>None</td>
    </tr>
    <tr>
      <td><strong>Management complexity</strong></td>
      <td>Low</td>
    </tr>
    <tr>
      <td><strong>Additional notes</strong></td>
      <td>Does not require network configuration. Good for local development.</td>
    </tr>
  </tbody>
</table>

## Create a user

docs: Add walkthrough for creating a user in PostgreSQL

To create a PostgreSQL user named **"lunaberry"**, follow these steps:

1. **Connect to PostgreSQL**:
    - Open a terminal or command prompt.
    - Use the following command to connect to the PostgreSQL server using an existing superuser (e.g., "postgres"):
      ```sh
      psql -U existing_superuser -d your_database_name
      ```
    - Replace `existing_superuser` with the actual superuser name and `your_database_name` with the target database.

2. **Create the User**:
    - Once connected, execute the following SQL command to create the "lunaberry" user (replace `'your_password'` with an actual password):
      ```sql
      CREATE USER lunaberry WITH LOGIN PASSWORD 'your_password';
      ```
    - When creating a PostgreSQL user, **you need to enclose the password in single quotes**

3. **Optional: Grant Additional Privileges**:
    - If you want to grant additional privileges to the "lunaberry" user (e.g., making them a superuser), you can use the following command:
      ```sql
      ALTER USER lunaberry WITH SUPERUSER;
      ```

4. **Exit psql**:
    - Type `\q` and press Enter to exit the PostgreSQL prompt.

Now the user **"lunaberry"** is created and can log in to the database using the specified password. Adjust the privileges and settings as needed for your use case.

Remember to replace placeholders (such as `'your_password'`) with actual values relevant to your setup. 

NOTE: Wrap the password with single quotes (`''`). End statements with semicolon (`;`).

## Database tool: pgAdmin 4

- [pgAdmin](https://www.pgadmin.org/)

**pgAdmin** is a feature-rich **open-source administration and development platform** for **PostgreSQL**

Here are some key points about pgAdmin:

1. **Purpose**:
   - **Database Management**: pgAdmin is designed for **administering and managing PostgreSQL databases**.
   - **Web-Based Tool**: It provides an **intuitive graphical interface (GUI)** for interacting with PostgreSQL databases.

2. **Features**:
   - **Cross-Platform**: pgAdmin can be used on **Linux, Unix, macOS, and Windows**.
   - **Administration**: It allows you to perform tasks such as creating, modifying, and deleting database objects.
   - **Development**: You can write and execute SQL queries, manage users, and handle backups.
   - **Customization**: Users can customize their workspace preferences to enhance productivity¹².

In summary, pgAdmin simplifies database management by offering a user-friendly interface for PostgreSQL administrators and developers. 

### Dark mode for pgAdmin 4

**pgAdmin** offers a dark theme to reduce eye strain during extended usage. Here's how you can enable dark mode in pgAdmin:

1. **pgAdmin 4 (v4+)**:
   - Open pgAdmin 4.
   - Go to **File** > **Preferences** > **Miscellaneous** > **Themes**.
   - Select the **dark theme** from the dropdown menu.
   - Remember to refresh the pgAdmin page for the changes to take effect.

### DBeaver

Another universal database tool is [Dbeaver](https://dbeaver.io/).

# PostgreSQL Intro

Why PostgreSQL?

- Free & Open Source
- Widely used in the Industry
- Career Opportunities
- Community Support

## SQL Primer

### Tables

Let's explore the components of an **SQL table**:

1. **Columns (Fields)**:
   - Columns define the **attributes** or **fields** of the data stored in the table.
   - Each column has an **individual name** and represents a specific type of data (e.g., numbers, text, dates).
   - Columns are **vertical** and provide the structure for organizing data.

2. **Rows (Records)**:
   - Rows, also known as **records**, represent **individual instances** of data within the table.
   - Each row contains a set of values corresponding to the columns.
   - Rows are **horizontal** and hold the actual data entries.

3. **Primary Key**:
   - A **primary key** is a column (or a set of columns) that **uniquely identifies** each row in the table.
   - It ensures data integrity by preventing duplicate records.
   - Common examples of primary keys include user IDs, order numbers, or product codes.

4. **Foreign Key** (Optional):
   - A **foreign key** establishes a relationship between two tables.
   - It references a primary key in another table, creating a link between related data.
   - Foreign keys maintain data consistency and enforce referential integrity.

5. **Table Constraints** (Optional):
   - Constraints define rules for data validation and integrity.
   - Examples include **NOT NULL** (ensuring a column cannot have null values), **UNIQUE** (ensuring unique values), and **CHECK** (defining custom conditions).

6. **Table Name**:
   - The table is identified by a **unique name** within the database.
   - Choose a descriptive name that reflects the purpose of the data stored in the table.

#### Example: Create Table

Here is an example code to create a table in SQL:

```sql
CREATE TABLE <Name of Table> (
  <field1> <DATATYPE>,
  <field> <DATATYPE>,
  <field3> <DATATYPE>
);
```

Certainly! Let's break down the SQL code you provided:

```sql
CREATE TABLE <Name of Table> (
  <field1> <DATATYPE>,
  <field2> <DATATYPE>,
  <field3> <DATATYPE>
);
```

Here's what each part means:

1. **`CREATE TABLE`**:
   - This SQL command is used to **create a new table** in the database.
   - It specifies that we want to define a new table.

2. **`<Name of Table>`**:
   - Replace `<Name of Table>` with the **actual name** you want for your table.
   - This is where you give your table a unique identifier.

3. **Columns (Fields)**:
   - Columns are defined within parentheses after the table name.
   - Each column is represented by `<fieldX>` (e.g., `<field1>`, `<field2>`, `<field3>`).
   - Replace `<fieldX>` with **descriptive column names** (e.g., `user_id`, `product_name`, etc.).

4. **`<DATATYPE>`**:
   - For each column, specify the **data type** of the values it will hold.
   - Examples of data types include:
     - `INT` (integer)
     - `VARCHAR(n)` (variable-length character string with a maximum length of `n`)
     - `DATE` (date)
     - `DECIMAL(p, s)` (decimal number with `p` total digits and `s` decimal places)

5. **Semicolon (`;`)**:
   - The semicolon at the end of the statement indicates the **end of the SQL command**.
   - It's essential to terminate SQL statements with a semicolon.

In summary, this SQL code creates a new table with the specified columns and their associated data types. Remember to customize it by replacing placeholders with actual table names and column names relevant to your use case.

#### Example 2: Table of friends

Let's create a table of friends.

```sql
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  age INT,
);
```

Let's break down the SQL code for creating a table named "friends":

1. **`CREATE TABLE friends (`**:
   - This line initiates the creation of a new table named "friends."
   - The opening parenthesis `(` indicates the start of the column definitions.

2. **`id SERIAL PRIMARY KEY,`**:
   - `id` is the name of the first column.
   - `SERIAL` specifies that this column will be an **auto-incrementing integer** (usually used for unique identifiers).
   - `PRIMARY KEY` designates this column as the **primary key**, ensuring each row has a unique value for the `id`.

3. **`name VARCHAR(50),`**:
   - `name` is the second column.
   - `VARCHAR(50)` defines a **variable-length character string** with a maximum length of 50 characters.
   - This column will store names.

4. **`age INT,`**:
   - `age` is the third column.
   - `INT` represents an **integer data type**.
   - This column will store age values.

5. **Closing Parenthesis `)`**:
   - The closing parenthesis `)` indicates the end of the column definitions.

Remember that this SQL code creates a table called "friends" with three columns: `id`, `name`, and `age`. The `id` column serves as the primary key, ensuring uniqueness for each row. The `name` column stores names, and the `age` column stores integer values representing ages. 



# Web App Walkthrough

## 1. Client
- The **front-end** of the website initiates communication with the server.
- It sends a **request** to the server-side.

## 2. Server
- The **server-side** processes the request received from the client.

## 3. App
- Within the application (e.g., `App.js`, `index.js`), the **business logic** handles the request.
- The app also **interacts with the database**.

## 4. Database
- The database **stores data** for the application.
- It **returns the necessary data** in response to requests from the app.

## Workflow
1. The app **retrieves data** and performs necessary **business logic**.
2. It then sends the **correct response** back to the server.
3. The client can now **format and display** the data.

# PostgreSQ: simple example in Node

Let's create a simple example using **PostgreSQL** and the **`pg` package**:

- [pg](https://www.npmjs.com/package/pg) is a non-blocking PostgreSQL client for Node.js.

Steps:
1. **Install PostgreSQL** on your system.
2. **Set up a database** (if you haven't already).
3. Install the **`pg` package** (a PostgreSQL client library) using your preferred package manager:

    ```sh
    npm install pg
    ```

4. **Connect to your PostgreSQL database** using the `pg` package.
5. Perform basic operations such as **querying data**, **inserting records**, or **updating data** to demonstrate the interaction between your Node application and the PostgreSQL database.

`index.js`
```js
import Client from "pg";

const db = new Client({
  user: "username",
  host: "localhost",
  database: "myDatabase",
  password: "password",
  port: 5432,
});

db.connect();

db.query("SELECT * FROM users", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    console.log("USer data:", res.rows);
  }
  
  db.end();
});
```
