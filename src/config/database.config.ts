import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connection = async () => {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: 3306 || process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  return pool;
};
