const Dish = require("../models/dish");
const Order = require("../models/order");

module.exports = {
  getAllOrders: async function (req, res) {
    try {
      const orders = await Order.find({}).populate("dish", "dishId");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  addOrder: async function (req, res) {
    try {
      const { customerName, quantity, dishId } = req.body;
      const dishCost = Dish.findOne({ _id: newOrder.dishId }, { dishPrice });
      const totalPrice = Number(newOrder.quantity) * Number(dishCost);

      const newOrder = Order({
        customerName: customerName,
        quantity: quantity,
        totalPrice: totalPrice,
        dishId: dishId,
      }); // dish Id reference is created, assuming that this is one of the fields in body.
      res.json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
};
