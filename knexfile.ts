import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

console.log('# Knexfile triggered. #');

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    /// Since SQLite does not support default values for fields.
    useNullAsDefault: true,
};

// Hints for deployment on Heroku:
// https://codeselfstudy.com/blog/deploy-node-postgres-heroku/