require("dotenv").config();    //load .env variables
const { Pool } = require("pg");

console.log("Connecting to DB:", process.env.POSTGRES_URL);

let pool;
const url = process.env.SUPABASE_DB_URL;


if (!url) {
  throw new Error("SUPABASE_DB_URL is not set");
}

// Sanity log
try {
  const u = new URL(url);
  console.log("DB runtime:", {
    host: u.hostname,        
    port: u.port,            
    user: u.username,        
    db: u.pathname.slice(1), 
  });
} catch (e) {
  console.error("Malformed SUPABASE_DB_URL (starts with):", url.slice(0, 12));
  throw e;
}


if (process.env.LOCAL_DB_HOST) {
  // Otherwise, fall back to local dev settings
  pool = new Pool({
    user: process.env.LOCAL_DB_USER, 
    host: process.env.LOCAL_DB_HOST, 
    database: process.env.LOCAL_DB_NAME, 
    password: process.env.LOCAL_DB_PASSWORD, 
    port: process.env.LOCAL_DB_PORT,
  });
} else {
  pool = new Pool({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }, 
  });
  console.log("DB: using SUPABASE_DB_URL");
}

// if (url) {
//   pool = new Pool({
//     connectionString: process.env.SUPABASE_DB_URL,
//     ssl: { rejectUnauthorized: false }, 
//   });
//   console.log("DB: using SUPABASE_DB_URL");
// } else {
//   // Otherwise, fall back to local dev settings
//   pool = new Pool({
//     user: process.env.LOCAL_DB_USER, 
//     host: process.env.LOCAL_DB_HOST, 
//     database: process.env.LOCAL_DB_NAME, 
//     password: process.env.LOCAL_DB_PASSWORD, 
//     port: process.env.LOCAL_DB_PORT,
//   });
// }

module.exports = pool;