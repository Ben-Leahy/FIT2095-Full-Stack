// ******************** Imports ********************
const express = require("express");
const path = require("path");

// ******************** Definitions ********************
const app = express();
const port = 3000;

// Our in-memory 'database' of tasks
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

// ******************** Endpoints ********************
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// if there is an optional priority, we only display that priority
app.get("/tasks", (req, res) => {
  const { priority } = req.query; // Destructure priority from req.query

  if (priority) {
    const filteredTasks = tasks.filter((t) => t.priority === priority);
    res.json(filteredTasks);
  } else {
    // If no priority query is provided, send all tasks
    res.json(tasks);
  }
});

app.get("/tasks/add-random", (req, res) => {
  const randomDescription =
    randomTasks[Math.floor(Math.random() * randomTasks.length)];
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    description: randomDescription,
    done: false,
    priority: "medium",
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// THis will pattern match if there is an ID, which means the above wouldn't (as we would expect, we would need the wild card to ignore all other htings. )
app.get("/tasks/:id", (req, res) => {
  // req.params contains route parameters (in this case, 'id')
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Task not found.");
  }
});

app.get(/.*report$/, (req, res) => {
  res.send("This is a report page.");
});

app.listen(port, () => {
  /* ... */
});
console.log(`To-Do app listening at http://localhost:${port}`);

//let's see
