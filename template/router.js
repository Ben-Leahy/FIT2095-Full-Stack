/**************************************** Imports ****************************************/
let express = require("express");
const path = require("path");

/**************************************** Definitions ****************************************/
let router = express.Router();

//Our data base will be a list of objects. We are not using pydantic to verify each object is the same -> we assume.
let tasks = [
  {
    id: 1,
    description: "Finish Express.js tutorial",
    done: false,
    priority: "high",
  },
  {
    id: 2,
    description: "Go grocery shopping",
    done: false,
    priority: "medium",
  },
  { id: 3, description: "Prepare for exams", done: true, priority: "high" },
  {
    id: 4,
    description: "Book dentist appointment",
    done: false,
    priority: "low",
  },
  { id: 5, description: "Water the plants", done: true, priority: "low" },
  { id: 6, description: "Call the bank", done: false, priority: "medium" },
];

const randomTasks = [
  "Read a chapter of a book",
  "Organise the desktop",
  "Learn a new word",
  "Write a short story",
];

/* **************************************** Endpoints ****************************************/
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html")); // ../ to go up a director/
});

// Extracing from the request query
// there is no index.html because we are just returning a json object
router.get("/tasks", (req, res) => { // This assumes a query string like ?priority=high. We could also do "/tasks/:priority" to get the priority from the URL.
  const { priority } = req.query; // Destructure priority from req.query. Ie if there is a query string like ?priority=high, priority will be "high"
    // let priority = req.query.priority; // Another way to destructure the query string
  if (priority) {
    const filteredTasks = tasks.filter((t) => t.priority === priority);
    res.json(filteredTasks);
  } else {
    // If no priority query is provided, send all tasks
    res.json(tasks);
  }
});


// Randomly selecting a task from the database.
router.get("/tasks/add-random", (req, res) => {
  const randomDescription =
    randomTasks[Math.floor(Math.random() * randomTasks.length)]; // this code generates a random number between 0 and the length of the randomTasks array, and uses that to select a random task description.
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    description: randomDescription,
    done: false,
    priority: "medium",
  };
  tasks.push(newTask);
  res.status(201).json(newTask); // res.status(statusCode) returns a response (res), meaning it is chainable and can be followed by .json() to send a JSON response.
});

// Regex route to catch all other requests and redirect them
router.get(/.*/, (req, res) => {
  res.redirect(301, "/views/redirect-page"); // 301 = Permanent Redirect
});

/**************************************** exports ****************************************/
module.exports = router;
