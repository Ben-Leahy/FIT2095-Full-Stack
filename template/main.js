// ******************** Imports ********************
const express = require("express");

// ******************** Definitions ********************
const app = express();
let router = require("./router.js");
const port = 3000;
app.use("/", router);

console.log(`To-Do app listening at http://localhost:${port}`);
app.listen(port, () => {});
