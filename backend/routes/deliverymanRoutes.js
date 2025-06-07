const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const requireRole = require("../middlewares/requireRole");
const deliverymanController = require("../controllers/deliverymanController");

// router.get("/profile", authorize, doctorController.getDoctorProfile);
router.get("/profile", authorize, requireRole("deliveryman"), deliverymanController.getDeliverymanProfile);

module.exports = router;