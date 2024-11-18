## Deployment

1. Install dependencies `npm install`

2. You must ensure that the application has access to the following environment variables:

HTTP_PORT - Port number on which the API server should listen for incoming requests.

#DATABASE
PGUSER - Username used to authenticate with the PostgreSQL database.
PGPASSWORD - Password used for authentication when connecting to the PostgreSQL database.
PGDATABASE - Name of the PostgreSQL database to connect to.
PGHOST - Hostname or IP address of the server where the PostgreSQL database is located.
PGPORT - Port number on which the PostgreSQL database server is listening for connections.
POSTGRES_PASSWORD - Only used in docker-compose options. Sets the password for the PostgreSQL database. Must match PGPASSWORD.

## NPM scripts

    npm run build - Compiles the TypeScript source code into JavaScript. This command generates the output files (typically in the dist/ directory) that are required to run the application in production.

    npm run start - Starts the application using the compiled JavaScript files from the dist/ directory. Typically, this is used to run the app in a production environment.

    npm run start:dev - Starts the application in development mode. This command watches for file changes and automatically restarts the app whenever a change is detected, making it ideal for development work.

    npm run start:prod - Starts the application in production mode, similar to npm run start, but may include additional optimizations or configurations for a production environment.

    npm run migration:run - Executes the database migrations that have been created, applying any pending migrations to the database.

    npm run migration - Runs a generic migration task, typically equivalent to migration:run, but may be a custom command specific to your project’s setup.

    npm run migration:create - Creates a new migration file, which you can then modify to define changes (e.g., new tables, columns) to your database schema.

    npm run migration:revert - Reverts the last applied migration, rolling back the most recent changes made to the database.

    npm run seed:run - Executes the seeding scripts, which populate the database with initial or sample data.

3. Start node.js application
