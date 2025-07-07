const express = require("express");
const { signUp, signIn, watchlist, checkWatchList } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

const authController = require("../controllers/authController");
console.log(authController);

const router = express.Router();

router.post("/signup", signUp);  
router.post("/signin", signIn);
router.post("/watchlist", authenticateToken, watchlist)
router.get('/checkWatchList', authenticateToken, checkWatchList);
// router.post("/signin", signIn);  // Existing Sign-in Route

module.exports = router;