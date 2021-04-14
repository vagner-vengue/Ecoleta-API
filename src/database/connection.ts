import knex from 'knex';  // Installed lib.
import dotenv from 'dotenv';

dotenv.config();

console.log('# DB connection started. #');

const connection = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
});

export default connection;
