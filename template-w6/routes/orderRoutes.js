const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// list orders
// GET http://localhost:8080/order
router.get("/", orderController.getAllOrders);

// show add order page
// GET http://localhost:8080/order/add
router.get("/add", orderController.sendAddOrderPage);
// receive new order from client
// POST http://localhost:8080/order/add
router.post("/add", orderController.createOrder);

// remove an order
// GET http://localhost:8080/order/remove/:id
router.get("/remove/:id", orderController.removeOrderById);

module.exports = router;