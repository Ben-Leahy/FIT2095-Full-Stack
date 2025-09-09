const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find({})
            .sort({ enrollmentDate: -1 })
            .exec();
        res.render('students', { students });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET add student form
router.get('/add', (req, res) => {
    res.render('add');
});

// POST create new student
router.post('/', async (req, res) => {
    try {
        const { studentId, firstName, lastName, email, course, year } = req.body;
        
        // Create new student instance
        const newStudent = new Student({
            studentId,
            firstName,
            lastName,
            email,
            course,
            year: parseInt(year)
        });
        
        await newStudent.save();
        res.redirect('/students');
    } catch (error) {
        console.error(error);
        
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).send(`Validation Error: ${errors.join(', ')}`);
        }
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).send(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists`);
        }
        
        res.status(500).send('Server Error');
    }
});

// GET edit student form
router.get('/:id/edit', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
            
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('edit', { student });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// POST update student
router.post('/:id/update', async (req, res) => {
    try {
        const { studentId, firstName, lastName, email, course, year } = req.body;
        
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            {
                studentId,
                firstName,
                lastName,
                email,
                course,
                year: parseInt(year)
            },
            { 
                new: true,              // Return the updated document
                runValidators: true     // Run schema validation
            }
        );
        
        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }
        
        res.redirect('/students');
    } catch (error) {
        console.error(error);
        
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).send(`Validation Error: ${errors.join(', ')}`);
        }
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).send(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists`);
        }
        
        res.status(500).send('Server Error');
    }
});

// POST delete student
router.post('/:id/delete', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        
        if (!deletedStudent) {
            return res.status(404).send('Student not found');
        }
        
        res.redirect('/students');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;