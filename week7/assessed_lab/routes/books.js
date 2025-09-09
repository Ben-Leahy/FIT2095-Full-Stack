const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// GET all books (/ben/books)
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
            .sort({ bookTitle: 1 })
            .exec();
        const bookCount = books.length;
        res.render('books', { books, bookCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;