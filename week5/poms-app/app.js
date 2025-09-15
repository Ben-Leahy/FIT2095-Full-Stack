// Imports
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const Parcel = require("./models/parcel");
const parcelRouter = require("./routes/parcelRoutes");

// Configure express: routing middleware.
const app = express();
app.listen(8080);
app.use(express.urlencoded({ extended: true }));

// Configure ejs
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

// // Boostrap for styling
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Configure mongoose
const URL = "mongodb://127.0.0.1:27017/poms-app";

async function connectDB(url) {
  await mongoose.connect(url);
  return "Connected to database successfully";
}
// Call the function to connect to the database, then output the returned value.
connectDB(URL)
  .then(console.log)
  .catch((err) => console.log(err));

// Routing
app.use("/parcel", parcelRouter);

app.get("/", function (req, res) {
  res.render("index");
});
