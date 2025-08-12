let express = require('express');
let app = express();

// './' here refers to current directory, if your router is in subfolder then ./folder/router.js
let router = require('./router.js');

app.use('/', router);

app.listen(8080);