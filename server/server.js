const express = require("express");
const cors = require("cors"); // Allows frontend to connect
const authRoutes = require("./routes/authRoutes"); // Import routes

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Allows JSON request bodies
app.use(cors()); // Enables frontend requests

// Routes
app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});