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

#### PostgreSQL data types

- [PostgreSQL data types | Reference](https://www.postgresql.org/docs/current/datatype.html)

##### CHAR vs VARCHAR

Let's explore the differences between the **CHAR** and **VARCHAR** data types in SQL:

1. **CHAR Datatype**:
   - **Fixed-Length**: The `CHAR` datatype is used to store character strings of a **fixed length**.
   - **Padding**: If the length of the string is less than the specified fixed length, it is **padded with extra blank spaces** to match the set length (when the `PAD_CHAR_TO_FULL_LENGTH` SQL mode is enabled).
   - **Storage Size**: The storage size of `CHAR` is **n bytes** (where `n` is the set length).
   - **Usage**: Use `CHAR` when you expect data values in a column to be of the **same length**.
   - **Example**:
     ```sql
     CREATE TABLE Student (Name VARCHAR(30), Gender CHAR(6));
     ```

2. **VARCHAR Datatype**:
   - **Variable-Length**: The `VARCHAR` datatype stores character strings of **variable length**, up to a maximum specified length.
   - **No Padding**: If the length of the string is less than the set length, it is stored as-is without extra blank spaces.
   - **Storage Size**: The storage size of `VARCHAR` is equal to the **actual length of the entered string in bytes**.
   - **Usage**: Use `VARCHAR` when you expect data values in a column to be of **varying lengths**.
   - **Example**:
     ```sql
     CREATE TABLE Student (Name VARCHAR(20), Gender CHAR(6));
     ```

3. **Summary**:
   - **CHAR** stands for "Character," while **VARCHAR** stands for "Variable Character."
   - **Storage Size**:
     - `CHAR`: Fixed size (n bytes).
     - `VARCHAR`: Actual length of the entered string (plus some extra bytes for holding length information).
   - **Performance**:
     - `CHAR` may have better performance due to fixed-length storage.
     - `VARCHAR` saves space when there is variation in value lengths.

Remember that choosing between `CHAR` and `VARCHAR` depends on your specific use case and the expected characteristics of the data you'll be storing.

##### Text data type

Let's delve into the **TEXT** data type in SQL:

1. **TEXT Datatype**:
   - The `TEXT` data type is used to store **large amounts of text data**.
   - It allows for **variable-length** storage, accommodating lengthy strings.
   - Unlike `CHAR` and `VARCHAR`, `TEXT` has **no fixed maximum length**.
   - **Storage Size**: The space allocated for `TEXT` is **16 bytes** for column storage.
   - **Usage**:
     - Use `TEXT` when you need to store **extensive textual content**, such as articles, descriptions, or comments.
     - It's suitable for scenarios where the length of the data varies significantly.

2. **Comparison with CHAR and VARCHAR**:
   - **CHAR**:
     - Fixed-length storage.
     - Padded with extra memory space if the string length is less than the set length.
     - Suitable for data values of the same length.
   - **VARCHAR**:
     - Variable-length storage.
     - Stores data as-is without padding.
     - Suitable for data values of varying lengths.
   - **TEXT**:
     - Variable-length storage (no maximum length).
     - Ideal for large textual content.
     - No need to specify a length; it adapts dynamically.

3. **Performance Considerations**:
   - `CHAR` might have better performance due to fixed-length storage.
   - `VARCHAR` and `TEXT` save space but may not perform as well as `CHAR`.

In summary, choose `TEXT` when dealing with extensive text data, and use `CHAR` or `VARCHAR` based on your specific requirements. Each type serves a distinct purpose in managing character data.

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

# PostgreSQL: simple example in Node

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
    console.log("User data:", res.rows);
  }
  
  db.end();
});
```

# Sample data

## CSV File

A **CSV file**, or a **Comma Separated Values** file, is a plain text file that stores data by delimiting data entries with **commas**. It is a way of organizing information in a **tabular format** within a simple text file. Here are some key points about CSV files:

1. **Structure of a CSV File**:
   - A CSV file consists of rows and columns, similar to a spreadsheet.
   - Data entries are separated by **commas** (hence the name "Comma Separated Values").
   - Each line typically represents one data record.
   - For example, a CSV file containing contact information might look like this:
     ```
     Name, Email, Phone Number
     Alice Johnson, alice@example.com, 123-456-7890
     Luna Berry, luna@example.com, 098-765-4321
     ```

2. **Common Uses**:
   - CSV files are often used for **data exchange** between different applications.
   - Databases, contact managers, and other software often support CSV files.
   - They allow data to be easily exported from one application and imported into another.

3. **Human-Readable Format**:
   - CSV files are plain text, making them **human-readable**.
   - You can view them using a simple text editor like **Notepad** or a spreadsheet program like **Microsoft Excel**.
   - The resulting data is organized and easy to understand.

4. **Opening a CSV File**:
   - To view the contents of a CSV file in **Notepad**, right-click the file in File Explorer or Windows Explorer, and select the **"Edit"** command.
   - For larger files, consider using a more capable plain text editor like **Notepad++**.
   - In Notepad++, right-click the CSV file and select **"Edit With Notepad++"** to see the plaintext data.

CSV files are a versatile way to store and exchange data, and they play a crucial role in data interoperability across various applications and platforms.

### Header row

The **first line** in a CSV file is typically known as the **header row**. It serves as a descriptor for the data columns within the file. Here are some important points about the header row in CSV files:

1. **Column Names**:
   - The header row contains the **names of the columns** or fields.
   - Each column name corresponds to a specific type of data.
   - For example, if you have a CSV file containing information about employees, the header row might include column names like "Name," "Email," and "Department."

2. **Purpose**:
   - The header row provides **context** for the data in subsequent rows.
   - It helps users understand what each column represents.
   - Without a header row, interpreting the data becomes more challenging.

3. **Example**:
   - Consider the following CSV snippet with a header row:
     ```
     Name, Email, Department
     Alice Johnson, alice@example.com, Sales
     Luna Berry, luna@example.com, Marketing
     ```

4. **Best Practices**:
   - Ensure that the header row is **clear and descriptive**.
   - Avoid using special characters or spaces in column names.
   - Make sure the header row matches the order of data in subsequent rows.

A well-defined header row makes working with CSV files more efficient and helps maintain data consistency across applications and systems.

# Create a TABLE in pgAdmin

In `sample-data`, we have a file named `capitals.csv`.

We can see that the header row is `id, country, capital`.

Given that all the `id` fields are unique, it's a sensible choice to designate the `id` column as the **primary key** for our PostgreSQL table. This ensures efficient indexing and maintains data integrity.

Next is the `country` field, which is a character string. Considering that all the countries in the list have names shorter than 45 characters, we can use the `VARCHAR` data type with a maximum length of 45 for storing country names in our database.

Similarly, `capitals` column is also of data type `VARCHAR(45)`.

Here is the SQL code we can use inside our database tool **pgAdmin** to create a table:

```sql
CREATE TABLE capitals (
  id SERIAL PRIMARY KEY,
  country VARCHAR(45),
  capital VARCHAR(45)
);
```

So how do we add this code to our database tool?

## Navigating pgAdmin

Now open up **pgAdmin** or the database tool of your choosing. Initially, it may ask you to set a global password.

- [Master Password | pgAdmin 4](https://www.pgadmin.org/docs/pgadmin4/latest/master_password.html)

**Remember**: Make sure to securely write down your passwords in a safe place!

After launching **pgAdmin**, navigate to the left pane where you'll find your servers. Look for the entry labeled `PostgreSQL 16` (or the version you installed). The password you use to log in is the same one you defined during your initial PostgreSQL installation.

Your default username is `postgres`, and you had to set a `password` for it.

By default we have a database named `postgres`. Let's look into closer details of what it is.

## postgres - the default PostgreSQL database

The default **PostgreSQL** database is named **"postgres"**. When you install a PostgreSQL server, this database is automatically created. Let's explore its purpose:

1. **Purpose of the "postgres" Database**:
   - The **"postgres"** database serves several roles:
     - It acts as a **default database** meant for use by **users**, **utilities**, and **third-party applications**.
     - When a client application connects to a PostgreSQL server, it must specify which database it wants to connect to. However, since the client application (e.g., **psql**) needs to connect to a database to query information, it is hard-coded to connect to the **"postgres"** database when listing available databases using the command **`psql -l`**.
     - Additionally, the **"postgres"** database is used as a **template** when creating new databases.

2. **Template Databases**:
   - PostgreSQL creates two template databases during initialization:
     - **"template1"**: A source database that serves as a template for creating new databases. You can add objects to it, and these objects will be copied into databases created later.
     - **"template0"**: Another source database that acts as a safety net. If you accidentally mess up other databases, you can restore them using **"template0"**.
     - **"postgres"** is the default database for connecting to the PostgreSQL server.

3. **Safety Note**:
   - **Do not delete** the **"postgres"** database if you're not using it actively. It still plays a role in various scenarios, such as database dumps and restores.
   - Deleting it could cause issues during database restoration or other operations.
   - 
Sources:
(1) [Default database named postgres on Postgresql server](https://stackoverflow.com/questions/2370525/default-database-named-postgres-on-postgresql-server)
(2) [PostgreSQL: Documentation: 16: CREATE DATABASE](https://www.postgresql.org/docs/current/sql-createdatabase.html)
(3) [PostgreSQL: Documentation: 16: initdb](https://www.postgresql.org/docs/current/app-initdb.html)

For now let's not touch the `postgres` default database, let's create our own.

## Create a **database** in pgAdmin

To create a database in **pgAdmin 4**, navigate to the left pane and right click on the **Databases** and click **Create > Database**.

In the `Database` input field we can add the name of the database. Let's name it `world`. We can also change the owner of the database, which by default is `postgres`. Now hit **Save** to create the database.

Now click on `world` database, expand the `Schemas` then `Tables` and see that we currently have no tables.

### Naming our database

When choosing a **PostgreSQL database name**, consider the following best practices:

1. **Descriptive and Meaningful**:
   - Opt for a name that reflects the purpose or content of the database.
   - Choose something descriptive and meaningful to you and your team.

2. **Avoid Special Characters**:
   - Stick to **lowercase letters**, **numeric digits**, and **underscores**.
   - Avoid using spaces, hyphens, or other special characters.
   - Although hyphens are technically allowed, they can cause confusion in certain scenarios.

3. **Consistency**:
   - Maintain consistency across your database names.
   - If you use underscores in one database name, follow the same convention for others.

4. **Readable and Pronounceable**:
   - Aim for a name that is easy to read and pronounce.
   - Avoid cryptic abbreviations or overly complex names.

5. **Examples**:
   - Here are some examples of good PostgreSQL database names:
     - `inventory_db`
     - `customer_data`
     - `blog_posts`
     - `sales_records`

Remember to choose a name that aligns with your project and team conventions.


