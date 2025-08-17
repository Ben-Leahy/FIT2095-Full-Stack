/**************************************** Imports ****************************************/
let express = require("express");
const path = require("path");

/**************************************** Definitions ****************************************/
let router = express.Router();

//Our data base will be a list of objects. We are not using pydantic to verify each object is the same -> we assume.
let parcels = [
  {
    id: 938,
    sender: "some person",
    address: "some address",
  },
];

function generateList(db) {
  let output = "ID  Sender   Address  </br>";
  for (const task of db) {
    output += task.id + " | " + task.sender + " | " + task.address + "</br>";
  }
  return output;
}

/* **************************************** Endpoints ****************************************/
// Assumes a URL like: http://localhost:8080/addparcel?sender=Harry&address=Melbourne
router.get("/addparcel", (req, res) => {
  const { sender, address } = req.query;
  const newId = Math.round(Math.random() * 1000); // Generate a random ID for the new parcel. This won't necessaruly be unique.
  parcels.push({
    id: newId,
    sender: sender,
    address: address,
  });
  res.sendFile(path.join(__dirname, "views/addparcel.html")); // ../ to go up a director/
});

// URL: http://localhost:8080/getparcels
router.get("/getparcels", (req, res) => {
  res.send(generateList(parcels)); // Send the parcels list as a JSON response.
});

// sample URL: http://localhost:8080/deleteid/938
// Randomly selecting a task from the database.
router.get("/deleteid/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = parcels.findIndex((task) => task.id === taskId);
  parcels.splice(taskIndex, 1);
  res.sendFile(path.join(__dirname, "views/deleteid.html")); // ../ to go up a director/
});

/**************************************** exports ****************************************/
module.exports = router;
