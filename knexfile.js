// Update with your config settings.
const dbConnection = process.env.DATABASE_URL;
const db_url = 'postgresql://neondb_owner:npg_4vK1gCVTSLkp@ep-lingering-moon-a8vn791w-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/parents.db3',
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreigh_keys = ON', done);
      },
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: db_url,
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds',
    },
  }

};
