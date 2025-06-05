// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { getAllAppointments } = require('../controllers/appointmentController');

router.get('/appointments', getAllAppointments);

module.exports = router;
