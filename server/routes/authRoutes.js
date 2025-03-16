const express = require("express");
const { signUp, signIn } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);  // 🆕 Route for user registration
// router.post("/signin", signIn);  // Existing Sign-in Route

module.exports = router;