const express = require("express");
const cors = require("cors"); // Allows frontend to connect
const authRoutes = require("./routes/authRoutes"); // Import routes
const pool = require("./config/db");

const app = express();

// Middleware
app.use(express.json()); // Allows JSON request bodies
app.use(cors()); // Enables frontend requests

// Routes
// Support both local paths and Vercel's /api prefix
app.use(["/auth", "/api/auth"], authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

module.exports = app;      //  <- exporting for vercel

// Only start a listener if this file is executed directly (local dev)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}