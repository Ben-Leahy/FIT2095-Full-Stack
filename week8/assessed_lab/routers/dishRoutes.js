const express = require("express");
const dishController = require("../controllers/dishController");

const router = express.Router();

// GET http://localhost:8080/ben/dishes
router.get("/", dishController.getAllDishes);

// POST http://localhost:8080/ben/dishes
router.post("/", dishController.addDish);

// PUT http://localhost:8080/ben/dishes/:id
router.put("/:id", dishController.updateDish);

// DELETE http://localhost:8080/ben/dishes/:id
router.delete("/:id", dishController.deleteDish);

module.exports = router;
