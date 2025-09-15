const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    product: {
        type: String,
        validate: {
            validator: function(value) {
                return value.length >= 2;
            },
            message: "Product name must be at least 2 characters long"
        },
        required: true
    },
    quantity: {
        type: Number,
        validate: {
            validator: function(value) {
                return value < 100;
            },
            message: "Quantity must be less than 100"
        },
        required: true
    },
    orderDate: {
        type: Date,
        min: "2025-01-01",
        max: Date.now()
    }
});

module.exports = mongoose.model("Order", orderSchema);