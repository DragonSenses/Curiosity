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

