let express = require("express");
let router = express.Router();
let db = [];

router.get("/", function (req, res) {
  res.send("Welcome to FIT2095 Week3 Home Page");
});

router.get("/list", function (req, res) {
  output =
    "the client needs the list of users in the database \n" +
    `List of users: ${db}` +
    `${displayUsers(db)}`;
});

router.get("/newuser", function (req, res) {
  res.send(
    "the client sends details of a new user through the URL to be inserted into the DB"
  );
  let baseURL = "http://" + req.headers.host + "/";
  let url = new URL(req.url, baseURL);
  let params = url.searchParams;

  console.log(`params: ${params}`);
  let newRecord = {
    name: params.get("name"),
    age: params.get("age"),
    address: params.get("address"),
  };
  db.push(newRecord);

  res.send(`List of users: ${db}`);
  res.send(displayUsers(db));
});
router.get("/deleteitem", function (req, res) {
  res.send(
    "the client sends through the URL the id (index) of a user to be deleted"
  );
  let baseURL = "http://" + req.headers.host + "/";
  let url = new URL(req.url, baseURL);
  let params = url.searchParams;
  let id = params.get("id");
  removeUser(db, id);
});
//export this router
module.exports = router;

function displayUsers(db) {
  let output =
    "<table> \n" +
    "<tr> <th> Name: </th> <th> Age: </th> <th> Address: </th> </tr> \n";
  for (i = 0; i < db.length; i++) {
    output =
      output +
      `<tr> <th> ${db[i].get("name")}: </th> <th> ${db[i].get(
        "age"
      )} </th> <th> ${db[i].get("address")} </th> </tr>\n`;
  }
  output += "</table>";
}

function removeUser(db, id) {
  db.splice(id, 1);
}
