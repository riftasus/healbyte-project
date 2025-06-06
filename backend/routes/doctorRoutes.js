const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const requireRole = require("../middlewares/requireRole");
const doctorController = require("../controllers/doctorController");

// router.get("/profile", authorize, doctorController.getDoctorProfile);
router.get("/profile", authorize, requireRole("doctor"), doctorController.getDoctorProfile);

module.exports = router;