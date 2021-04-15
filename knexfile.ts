import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

console.log('# Knexfile triggered. #');

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    useNullAsDefault: true,
};
