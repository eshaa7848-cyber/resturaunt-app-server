const express = require("express");
const router = express.Router();
const { protect, managerOnly } = require("../middleware/auth");
const { createReservation, myReservations, allReservations, updateReservation } = require("../controllers/reservationcontrollers");
router.post("/", protect, createReservation);
router.get("/my", protect, myReservations);
router.get("/", protect, managerOnly, allReservations);
router.patch("/:id", protect, managerOnly, updateReservation);
module.exports = router;