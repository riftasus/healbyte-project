const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const requireRole = require("../middlewares/requireRole");
const patientController = require("../controllers/patientController");

// router.get("/profile", authorize, doctorController.getDoctorProfile);
router.get("/profile", authorize, requireRole("patient"), patientController.getPatientProfile);

module.exports = router;