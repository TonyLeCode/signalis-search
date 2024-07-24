## Usage
To use, type `npm run kysely <command>`, replacing `<command>`.

Alternatively, for convenience, you can use the following:
`npm run migrate-up`
`npm run migrate-down`

## Kysely Commands

              init    Create a sample kysely.config file
      migrate:down    Undo the last/specified migration that was run
    migrate:latest    Update the database schema to the latest version
      migrate:list    List both completed and pending migrations
      migrate:make    Create a new migration file
  migrate:rollback    Rollback all the completed migrations
          seed:run    Run seed files
         seed:make    Create a new seed file
        migrate:up    Run the next migration that has not yet been run
           migrate    Migrate the database schema
              seed    Populate your database with test or seed data independent of your migration files