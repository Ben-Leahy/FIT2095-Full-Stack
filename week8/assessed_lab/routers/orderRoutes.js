const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// GET http://localhost:8080/ben/orders
router.get("/", orderController.getAllOrders);

// POST http://localhost:8080/ben/orders
router.post("/", orderController.addOrder);

module.exports = router;
