
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
let students = [
    // Sample data for demonstration
    { id: 1, name: 'John Doe', age: 20, address: '123 Main St' },
    { id: 3, name: 'Jane Smith', age: 22, address: '456 Oak Ave' }
];

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

function generateUniqueId() {
    // Generate a unique ID based on the current timestamp and a random number
    return Math.floor(Math.random() * Date.now())
}

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
            id: generateUniqueId(), // Generate a unique ID for the student
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

app.post('/remove-student/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(`Removing student with ID: ${id}`);
    
    indexOfStudentToRemove = students.findIndex(student => student.id === id);
    console.log(indexOfStudentToRemove);
    if (indexOfStudentToRemove !== -1) {
        const removedStudent = students[indexOfStudentToRemove];
        students.splice(indexOfStudentToRemove, 1);
        console.log(`Student removed: ${removedStudent.name}`);
    }

    res.redirect('/');
});

app.post('/edit-student/:id', (req, res) => {
    const id = Number(req.params.id);
    
    indexOfStudentToRemove = students.findIndex(student => student.id === id);
    console.log(indexOfStudentToRemove);
    if (indexOfStudentToRemove !== -1) {
        const removedStudent = students[indexOfStudentToRemove];
        students.splice(indexOfStudentToRemove, 1);
        console.log(`Student removed: ${removedStudent.name}`);
    }

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