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
  },
  fragile: {
    type: Boolean,
    required: [true, "Fragile (true false) is required"],
  },
});

module.exports = mongoose.model("Parcel", parcelSchema);
