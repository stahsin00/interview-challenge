import 'dotenv/config.js';
import mysql from 'mysql2/promise';

export let db;

export const connectToMySQL = async () => {
  let retries = 5;

  while (retries) {
    try {
      db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      });

      console.log('Connected to MySQL');
      return;
    } catch (err) {
      console.log(`Failed to connect to MySQL. ${retries} retries left. Waiting...`);
      retries -= 1;
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  console.error(`Could not connect to MySQL after ${retries} retries`);
  process.exit(1);
};
