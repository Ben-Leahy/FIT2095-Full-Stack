const mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
    customerName: {
        type: String,
    },
    quantity: {
        type: Number,
        min: [1, 'Quantity must be at least 1'],
    },
    totalPrice:{
        type: Number,
        min: [0, 'Price must be positive'],
        max: [10000, 'Price too high'],
    },
    dishId: {
        type: mongoose.Schema.ObjectId,
		ref: "Dish",
    }
});
module.exports = mongoose.model("Order", orderSchema);
