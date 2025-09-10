require("dotenv").config();    //load .env variables
const { Pool } = require("pg");

let pool;

// If Vercel env has SUPABASE_DB_URL → use that
if (process.env.SUPABASE_DB_URL) {
  pool = new Pool({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }, 
  });
  console.log("DB: using SUPABASE_DB_URL");
} else if (process.env.SUPABASE_DB_HOST) {
  pool = new Pool({
    host: process.env.SUPABASE_DB_HOST,
    port: process.env.SUPABASE_DB_PORT,
    user: process.env.SUPABASE_DB_USER,
    database: process.env.SUPABASE_DB_NAME,
    password: process.env.SUPABASE_DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
  });
  console.log("DB: using SUPABASE_* parts (host/port/user/db)");
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