const express = require("express");
const router = express.Router();
const { protect, managerOnly } = require("../middleware/auth");
const { placeOrder, myOrders, allOrders, updateStatus } = require("../controllers/ordercontrollers");
router.post("/", protect, placeOrder);
router.get("/my", protect, myOrders);
router.get("/", protect, managerOnly, allOrders);
router.patch("/:id/status", protect, managerOnly, updateStatus);
module.exports = router;