// ============================================
// DEPENDENCIES AND SETUP
// ============================================

// Import Express framework
const express = require('express');

// Create Express application instance
const app = express();

// Define server port (use environment variable in production)
const port = process.env.PORT || 3000;

// ============================================
// DATA STORAGE (In-Memory Database)
// ============================================

// Array to store student records
// In production, this would be replaced with a real database
let students = [
    // Sample data for demonstration
    { name: 'John Doe', age: 20, address: '123 Main St' },
    { name: 'Jane Smith', age: 22, address: '456 Oak Ave' }
];

// ============================================
// VIEW ENGINE CONFIGURATION
// ============================================

// Set EJS as the templating engine
// This allows us to use .ejs files for dynamic HTML generation
app.set('view engine', 'ejs');

// Specify the directory containing view templates
// Express will look for .ejs files in the ./views folder
app.set('views', './views');

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// Parse URL-encoded bodies from HTML forms
// extended: true allows parsing of nested objects
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JavaScript, images)
// Files in the 'public' folder will be accessible directly
app.use(express.static('public'));

// ============================================
// ROUTES (Request Handlers)
// ============================================

// HOME PAGE ROUTE
// Method: GET
// Path: / (root)
// Purpose: Display all students and the add student form
app.get('/', (req, res) => {
    // Render the index.ejs template
    // Pass the students array as data to the view
    res.render('index', { 
        students: students 
    });
});

// ADD STUDENT ROUTE
// Method: POST
// Path: /add-student
// Purpose: Process form submission and add new student
app.post('/add-student', (req, res) => {
    // Extract form data from request body
    // These keys match the 'name' attributes in our form
    const { name, age, address } = req.body;
    
    // Server-side validation
    // Check that all required fields are provided
    if (name && age && address) {
        // Create new student object
        students.push({
            name: name.trim(),        // Remove extra whitespace
            age: parseInt(age),       // Convert string to integer
            address: address.trim()   // Remove extra whitespace
        });
        
        console.log(`New student added: ${name}`);
    } else {
        console.log('Invalid student data received');
    }
    
    // Redirect to home page to show updated list
    // This follows the POST-Redirect-GET pattern
    res.redirect('/');
});

// CLEAR ALL STUDENTS ROUTE (Optional)
// Method: POST
// Path: /clear-students
// Purpose: Remove all students from the registry
app.post('/clear-students', (req, res) => {
    // Reset the students array
    students = [];
    console.log('All students cleared');
    
    // Redirect back to home page
    res.redirect('/');
});

// ============================================
// ERROR HANDLING (Optional but recommended)
// ============================================

// Handle 404 errors - Page not found
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// ============================================
// START SERVER
// ============================================

// Start the Express server
app.listen(port, () => {
    console.log(`================================`);
    console.log(`Student Registry Application`);
    console.log(`Server running on port ${port}`);
    console.log(`Visit: http://localhost:${port}`);
    console.log(`================================`);
});