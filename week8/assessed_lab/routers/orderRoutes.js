const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// GET http://localhost:8080/ben/orders
app.get("/", orderController.getAllOrders);

// POST http://localhost:8080/ben/orders
app.post("/", orderController.addOrder);

module.exports = router;
