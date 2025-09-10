const express = require("express");
const cors = require("cors"); // Allows frontend to connect
const authRoutes = require("./routes/authRoutes"); // Import routes

const app = express();

// Middleware
app.use(express.json()); // Allows JSON request bodies
app.use(cors()); // Enables frontend requests

// Routes
app.use("/auth", authRoutes);   

app.get("/health", (req, res) => {
  res.json({ ok: true, env: process.env.SUPABASE_DB_URL ? "vercel/supabase" : "local" });
});
//To check the connection is working

module.exports = app;      //  <- exporting for vercel

// Only start a listener if this file is executed directly (local dev)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}