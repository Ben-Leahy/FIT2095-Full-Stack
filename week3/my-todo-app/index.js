// index.js (updated)
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Our in-memory 'database' of tasks
let tasks = [
  { id: 1, description: 'Finish Express.js tutorial', done: false, priority: 'high' },
  { id: 2, description: 'Go grocery shopping', done: false, priority: 'medium' },
  { id: 3, description: 'Prepare for exams', done: true, priority: 'high' },
  { id: 4, description: 'Book dentist appointment', done: false, priority: 'low' },
  { id: 5, description: 'Water the plants', done: true, priority: 'low' },
  { id: 6, description: 'Call the bank', done: false, priority: 'medium' },
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// New route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => { /* ... */ });
console.log(`To-Do app listening at http://localhost:${port}`);