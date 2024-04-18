import pg from 'pg';
const Client = pg.Client;

// Database connection configuration
const dbConfig = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'turbo_development',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

export default client;
// module.exports = client.connect();
