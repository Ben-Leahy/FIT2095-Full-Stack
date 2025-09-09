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

// Again can't test because of the error with the book
// POST create new rental
router.post("/add", async (req, res) => {
  try {
    const { rentalId, customerName, rentalDays, totalCost, bookId } = req.body;

    const newRental = new Rental({
      rentalId: rentalId,
      customerName: customerName,
      rentalDays: parseInt(rentalDays),
      totalCost: parseFloat(totalCost), 
      bookId : bookId, 
    });
    console.log(newRental);

    await newRental.save();
    res.redirect("/ben/rentals");
  } catch (error) {
    console.error(error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send(`Validation Error: ${errors.join(", ")}`);
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .send(
          `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
        );
    }

    res.status(500).send("Server Error");
  }
});


//pass in bookIds

module.exports = router;
