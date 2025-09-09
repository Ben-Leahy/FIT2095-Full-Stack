const express = require("express");
const Rental = require("../models/Rental");

const router = express.Router();

// GET all rentals (/ben/rentals)
router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find({}).populate('bookAuthor').exec();
    res.render("rentals", { rentals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
