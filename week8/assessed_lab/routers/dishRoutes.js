const express = require("express");
const dishController = require("../controllers/dishController");

const router = express.Router();

// GET http://localhost:8080/ben/orders
app.get("/", dishController.getAllDishes);

// POST http://localhost:8080/ben/orders
app.post("/", dishController.addDish);

// PUT http://localhost:8080/ben/orders/:id
app.put("/:id", dishController.updateDish);

// DELETE http://localhost:8080/ben/orders/:id
app.delete("/:id", dishController.deleteDish);

module.exports = router;
