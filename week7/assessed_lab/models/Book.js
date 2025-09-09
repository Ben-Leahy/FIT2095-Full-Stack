const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // Our options are to add a unique ID, or ensure that bookTitle is unique.
  bookId: {
    type: String,
    required: [true, "Book ID is required"],
    unique: true,
    trim: true,
    uppercase: true,
  },
  bookTitle: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    minlength: [2, "Book title must be at least 2 characters"],
    maxlength: [50, "Book title cannot exceed 50 characters"],
  },
  bookAuthur: {
    type: String,
    required: [true, "Book authur is required"],
    trim: true,
    minlength: [2, "Book authur must be at least 2 characters"],
    maxlength: [50, "Book authur cannot exceed 200 characters"],
  },
  rentalPrice: {
    type: Number,
    required: [true, "Daily rental price is required"],
    min: [0.01, "Daily rental price must be between $0.01 and $50"],
    max: [50, "Daily rental price must be between $0.01 and $50"],
  },
});

// Create indexes for better query performance
bookSchema.index({ bookId: 1 }); // ascending

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
