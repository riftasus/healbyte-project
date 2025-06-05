// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser); // ✅ ADD THIS LINE

module.exports = router;
