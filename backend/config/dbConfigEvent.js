const mysql = require("mysql2");
const { config } = require("dotenv");

// Load environment variables from .env file
config();

// Create a connection pool
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
}).promise();

// Test connection function
async function testConnection() {
  try {
    await connection.query("SELECT 1");
    console.log("Connected to MYSQL");
  } catch (e) {
    console.error("Error connecting to the database:", e);
    throw e; // Rethrow the error after logging
  }
}

// Export the connection pool and test connection function
module.exports = { connection, testConnection };
