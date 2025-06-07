const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const requireRole = require("../middlewares/requireRole");
const coordinatorController = require("../controllers/coordinatorController");

// router.get("/profile", authorize, doctorController.getDoctorProfile);
router.get("/profile", authorize, requireRole("coordinator"), coordinatorController.getCoordinatorProfile);

module.exports = router;