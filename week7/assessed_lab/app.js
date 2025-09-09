const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve Bootstrap CSS
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

// Serve Bootstrap JavaScript
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Routes
const bookRoutes = require('./routes/books');
app.use('/ben/books', bookRoutes); // we don't know what this needs to be

const rentalRoutes = require('./routes/rentals');
app.use('/ben/rentals', rentalRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Connect to MongoDB and start server
async function startServer() {
    try {
        await connectToMongoDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();