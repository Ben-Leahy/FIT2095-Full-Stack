// import external modules
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

// import local modules
// const customerRouter = require("./routes/customerRoutes"); (homework)
const orderRouter = require("./routes/orderRoutes");
const Customer = require("./models/customer");

/**
 * Configure Express
 */
const app = express();
app.listen(8080);
app.use(express.urlencoded({extended: false}));

/**
 * Configure EJS
 */
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

/**
 * Configure Mongoose
 */
const URL = "mongodb://127.0.0.1:27017/week6lec";

async function connectDB(url) {
    await mongoose.connect(url);
    return ("Connected Successfully");
}

connectDB(URL)
    .then(console.log)
    .catch((err) => console.log(err))
    .then(createCustomer); // demo purpose

// demo purpose
async function createCustomer() {
    let count = await Customer.countDocuments({});
    if(count === 0) {
        let customer = new Customer({name: "Joe"});
        await customer.save();
        console.log(customer);
    }
}


/**
 * Configure Routing
 */
// app.get("/", function (req, res) {...}) (homework)
// app.use("/customer", customerRouter); (homework)
app.use("/order", orderRouter);