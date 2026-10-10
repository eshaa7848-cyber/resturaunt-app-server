const express = require("express");
const router = express.Router();
const { getMenu, getOne, createItem, updateItem, deleteItem } = require("../controllers/menucontrollers");
const { protect, managerOnly } = require("../middleware/auth");

router.get("/", getMenu);
router.get("/:id", getOne);
router.post("/", protect, managerOnly, createItem);
router.put("/:id", protect, managerOnly, updateItem);
router.delete("/:id", protect, managerOnly, deleteItem);
module.exports = router;