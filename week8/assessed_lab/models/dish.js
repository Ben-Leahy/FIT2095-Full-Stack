const mongoose = require("mongoose");

let dishSchema = mongoose.Schema({
	dishName: {
		type: String,
	},
	dishType: {
		type: String,
        enum: {
            values: ['appetizer', 'main', 'dessert'],
            message: 'Please select a valid dish type'
        },
	},
	dishPrice:{
        type: Number,
        min: [0, 'Price must be positive'],
        max: [500, 'Price too high']
    },
});
module.exports = mongoose.model("Dish", dishSchema);
