const Dish = require("../models/dish");
const Order = require("../models/order");
// Can't test any of these!
//Error:  <pre>Cannot GET /ben/dishes</pre>
// Same error I get when running Week 7 lab tasks Part 3 sample code.
// I probably have errors but can't bug fix any of them.
module.exports = {
  getAllDishes: async function (req, res) {
    try {
      const dishes = await Dish.find({});
      const dishCount = await Dish.countDocuments({});
      res.json({ dishes: dishes, dishCount: dishCount });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  addDish: async function (req, res) {
    try {
      const dishInput = req.body;
      const newDish = Dish(dishInput);
      await newDish.save();
      res.json(newDish);
    } catch (error) {
      console.log("Error in addDish function.");
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  updateDish: async function (req, res) {
    try {
      const dishInput = req.body;
      const id = req.params.id;
      const newDish = await Dish.findByIdAndUpdate(id, dishInput, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validation
      });
      if (!updatedStudent) {
        res.status(404).send("Student not found");
      }
      res.json(newDish);
    } catch (error) {
      console.log("Error in addDish function.");
      {
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
  },
  deleteDish: async function (req, res) {
    //Dish is not deleted from customer. If dish is deleted and the customer has already ordered it presumably the dish will still be made for the customer. It is only new orders that this will be applied for
    try {
      const id = req.params.id;
      const deletedDish = await Order.findByIdAndDelete({ _id: id });
      if (!deletedDish) {
        return res.status(404).send("Dish not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
};
