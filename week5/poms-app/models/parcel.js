const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: [true, "Sender is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  weight: {
    type: Number,
    required: [true, "weight is required"],
    validate: {
      validator: function (value) {
        return value > 0 && !isNaN(value);
      },
      message: "Weight must be a positive number",
    },
  },
  fragile: {
    type: Boolean,
    required: [true, "Fragile (true false) is required"],
    validate: {
      validator: function (value) {
        return value === true || value === false;
      }
    }
  },
});

module.exports = mongoose.model("Parcel", parcelSchema);
