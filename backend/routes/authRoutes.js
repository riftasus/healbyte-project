// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');
const {checkValidity} = require('../middlewares/validInfo');

router.post('/login', checkValidity,loginUser);
router.post('/register', checkValidity, registerUser); // ✅ ADD THIS LINE

module.exports = router;
