// api/index.js
const app = require("../server/server");

// Export the Express app so Vercel can run it as a serverless function
module.exports = app;