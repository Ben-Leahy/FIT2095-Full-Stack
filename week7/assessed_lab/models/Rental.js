const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    // Our options are to add a unique ID, or ensure that bookTitle is unique.
    rentalId: {
        type: String,
        required: [true, 'Rental ID is required'],
        unique: true,
        trim: true,
        uppercase: true
    },
    customerName: {
        type: String,
        required: [true, 'Customer Name is required'],
        trim: true,
        minlength: [2, 'Customer Name must be at least 2 characters'],
        maxlength: [50, 'Customer Name cannot exceed 50 characters']
    },
    rentalDays: {
        type: Number,
        required: [true, 'Number of rental days is required'],
        min: [0, 'Number of rental days must be between 0 and 365'],
        max: [365, 'Number of rental days must be between 0 and 365']
    },
    totalCost: {
        type: Number,
        required: [true, 'Total rental cost is required'],
        min: [0.01, 'Total rental cost must be between $0.01 and $18250'], //$50 * 365 days
        max: [18250, 'Total rental cost must be between $0.01 and $18250']
    },
    bookId: {
        type: String,
        required: [true, 'Book ID is required'],
        unique: true,
        trim: true,
        uppercase: true
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create indexes for better query performance
// studentSchema.index({ bookId: 1 }); // ascending

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;