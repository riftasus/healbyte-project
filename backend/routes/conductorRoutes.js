const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const requireRole = require("../middlewares/requireRole");
const conductorController = require("../controllers/conductorController");

// router.get("/profile", authorize, doctorController.getDoctorProfile);
router.get("/profile", authorize, requireRole("test_conductor"), conductorController.getConductorProfile);

module.exports = router;