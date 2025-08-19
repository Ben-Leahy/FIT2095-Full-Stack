// ******************** Imports ********************
const express = require("express");
let router = require("./router.js");

// ******************** Definitions ********************
const app = express();
const port = 8080;

// ******************** Functionality ********************
app.use("/", router);
app.listen(port, () => {});

console.log(`To-Do app listening at http://localhost:${port}`);

