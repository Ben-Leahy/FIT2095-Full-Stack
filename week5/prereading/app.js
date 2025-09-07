/*
 Develop an application that represents a simple human resources management system. It should have the following functions:

- Add a new user, where each user has a name, age, and address
- Delete a user by the name
- Update the user by the name
- List all users

Notes:
Data should be saved persistently
redirect the client to 'list users' after the insert, delete, and update operations.
*/

//Import packages
const express = require("express");
const { MongoClient } = require("mongodb");
const ejs = require("ejs");

//Configure Express
const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.listen(8080);

//reference to the database (i.e. collection)
let db;
let collection;
// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
    await client.connect();
    db = client.db("week5");
    collection = db.collection("documents");

    console.log("Listening on http://localhost:8080/")
    return "Connected successfully to server.";
}

main().then(console.log);


// Endpoints
app.get("/", function(req, res) {
    res.send("index");
});
