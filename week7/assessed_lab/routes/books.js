const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
            .sort({ bookTitle: 1 })
            .exec();
        res.render('books', { books });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
module.exports = router;