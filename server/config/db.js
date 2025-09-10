require("dotenv").config();    //load .env variables
const { Pool } = require("pg");

let pool;

// If Vercel env has SUPABASE_DB_URL → use that
if (process.env.SUPABASE_DB_URL) {
  pool = new Pool({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }, 
  });
} else {
  // Otherwise, fall back to local dev settings
  pool = new Pool({
    user: process.env.LOCAL_DB_USER, 
    host: process.env.LOCAL_DB_HOST, 
    database: process.env.LOCAL_DB_NAME, 
    password: process.env.LOCAL_DB_PASSWORD, 
    port: process.env.LOCAL_DB_PORT,
  });
}

module.exports = pool;