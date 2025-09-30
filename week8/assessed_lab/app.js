const express = require("express");
const mongoose = require("mongoose");
let path = require("path");

let app = express();
const PORT_NUMBER = 8080;

app.listen(PORT_NUMBER, () => {
	console.log(`Listening on port ${PORT_NUMBER}`);
});

app.use(express.json());

let url = "mongodb://localhost:27017/lab03";

async function connect() {
	await mongoose.connect(url);
    return("Connected to mongoose");
}
connect()
    .then(console.log)
    .catch((error) => {
	console.log(`unable to connect to Mongoose: ${error}`);
});

const orderRouter = require("./routers/orderRoutes");
app.use("/ben/orders", orderRouter);

const dishRouter = require("./routers/dishRoutes");
app.use("/ben/dishes", dishRouter);