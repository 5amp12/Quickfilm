const express = require("express");
const { signUp, signIn } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);  
router.post("/signin", signIn);
// router.post("/signin", signIn);  // Existing Sign-in Route

module.exports = router;