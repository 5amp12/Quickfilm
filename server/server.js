const express = require("express");
const cors = require("cors"); // Allows frontend to connect
const authRoutes = require("./routes/authRoutes"); // Import routes

const app = express();

// Middleware
app.use(express.json()); // Allows JSON request bodies
app.use(cors()); // Enables frontend requests

// Routes
// Support both local paths and Vercel's /api prefix
app.use(["/auth", "/api/auth"], authRoutes);

app.get(["/health", "/api/health"], (req, res) => {
      const hasUrl = !!process.env.SUPABASE_DB_URL;
      const hasParts = !!process.env.SUPABASE_DB_HOST;
      const dbMode = hasUrl ? "supabase-url" : hasParts ? "supabase-parts" : "local";
      let urlInfo = null;
      if (hasUrl) {
        try {
          const u = new URL(process.env.SUPABASE_DB_URL);
          urlInfo = {
            protocol: u.protocol.replace(":", ""),
            hostFromUrl: u.hostname,
            portFromUrl: u.port,
            userFromUrl: decodeURIComponent(u.username),
            dbFromUrl: (u.pathname || "").replace(/^\//, ""),
          };
        } catch (_) {
          urlInfo = { parseError: true };
        }
      }
      res.json({
        ok: true,
        dbMode,
        usingUrl: hasUrl,
        usingParts: hasParts,
        host: process.env.SUPABASE_DB_HOST || process.env.LOCAL_DB_HOST || "localhost",
        port: Number(process.env.SUPABASE_DB_PORT || process.env.LOCAL_DB_PORT || 5432),
        user: process.env.SUPABASE_DB_USER || process.env.LOCAL_DB_USER || "postgres",
        urlInfo,
      });
});
//To check the connection is working, go to /health

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