const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const requireRole = require("../middlewares/requireRole");
const doctorController = require("../controllers/doctorController");

// router.get("/profile", authorize, doctorController.getDoctorProfile);
router.get("/profile", authorize, requireRole("doctor"), doctorController.getDoctorProfile);
router.get("/top-rated", doctorController.getTopRatedDoctors);
// This route is for fetching the top-rated doctors

module.exports = router;