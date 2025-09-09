const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// GET all books (/ben/books)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({}).sort({ bookTitle: 1 }).exec();
    const bookCount = books.length;
    res.render("books", { books, bookCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// GET add book form
router.get("/add", (req, res) => {
  res.render("addBook");
});

// POST create new student
router.post("/add", async (req, res) => {
  try {
    const { bookTitle, bookAuthor, rentalPrice } = req.body;
    // bookId = 2145;
    // console.log(bookTitle);
    // Book id should be automatically generated idk what is going wrong.
    // Create new student instance
    console.log(bookAuthor); // this is a not null value idk why this isn't working.
    const newBook = new Book({
      bookTitle: bookTitle,
      bookAuthor: bookAuthor,
      rentalPrice: parseFloat(rentalPrice),
    });
    console.log(newBook);

    await newBook.save();
    res.redirect("/ben/books");
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

module.exports = router;
