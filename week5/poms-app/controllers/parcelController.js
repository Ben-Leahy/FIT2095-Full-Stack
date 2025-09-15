const Parcel = require("../models/parcel");

async function addPage(req, res) {
  res.render("addParcel"); // automatically sends status 200
}

async function add(req, res) {
  // Add
  try {
    const { sender, address, weight, fragile } = req.body;
    const newParcel = new Parcel({
      sender,
      address,
      weight,
      fragile: fragile === "true" ? true : false,
    });

    await newParcel.save();
    res.redirect("/parcel/view-all"); // TODO i think this should send 303 status
  } catch (error) {
    console.error(error);
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).send(`Validation Error: ${errors.join(", ")}`);
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .send(
          `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
        );
    }
    res.status(500).send("Server Error");
  }
}

async function viewAll(req, res) {
  try {
    const parcels = await Parcel.find({});
    res.render("viewParcels", { parcels: parcels });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

async function deleteByIdPage(req, res) {
  const parcels = await Parcel.find({});
  res.render("deleteParcel", { parcels: parcels });
}

async function deleteById(req, res) {
  try {
    const { id } = req.body;
    await Parcel.deleteOne({ _id: id });
    res.redirect("/parcel/view-all");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

async function updateByIdPage(req, res) {
  const parcels = await Parcel.find({});
  res.render("updateParcel", { parcels: parcels });
}

async function updateById(req, res) {
  //TODO drop down menu for the id, then all the other things must be entered. Could potentially have default values of what it is now
  try {
    const { id, sender, address, weight, fragile } = req.body;
    await Parcel.updateOne(
      { _id: id },
      { sender: sender, address: address, weight: weight, fragile: fragile }
    );
    res.redirect("/parcel/view-all");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  addPage,
  add,
  viewAll,
  deleteById,
  deleteByIdPage,
  updateById,
  updateByIdPage,
};
