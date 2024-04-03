# Postgresql

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

