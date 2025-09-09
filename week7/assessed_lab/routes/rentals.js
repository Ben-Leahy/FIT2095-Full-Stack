const express = require("express");
const Rental = require("../models/Rental");
const Book = require("../models/Book");

const router = express.Router();

// GET all rentals (/ben/rentals)
router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find({}).populate("bookAuthor").exec();
    res.render("rentals", { rentals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Can't test because I can't add a book, and the drop down won't fill until.
// GET add rental form
router.get("/add", async (req, res) => {
  try {
    const bookIds = await Book.find({}, "bookId");
    res.render("addRental", { bookIds });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//pass in bookIds

module.exports = router;
