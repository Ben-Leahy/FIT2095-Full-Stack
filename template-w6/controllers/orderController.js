const Order = require("../models/order");
const Customer = require("../models/customer");

module.exports = {
    getAllOrders: async function (req, res) {
        let orders = await Order.find({});
        res.render("list-order", {orders: orders});
    },
    sendAddOrderPage: function(req, res) {
        res.render("add-order", {});
    },
    createOrder: async function (req, res) {
        let anOrder = req.body;
        try {
            let orderDoc = new Order({product: anOrder.product, quantity: anOrder.quantity, orderDate: anOrder.orderDate});
            await orderDoc.save();
            if(req.body.customerId !== ""){
                let customerDoc = await Customer.findOne({_id:req.body.customerId});
                customerDoc.orders.push(orderDoc._id);
                await customerDoc.save();
            }
            res.redirect("/order");
        }catch (err) {
            console.log(err);
            res.redirect("/order/add");
        }
    },
    removeOrderById: async function (req, res) {
        let id = req.params.id;

        await Customer.updateMany(
            {orders: id},
            {$pull: {orders: id}}
        );

        await Order.deleteOne({_id: id});
        res.redirect("/order");
    }
}
