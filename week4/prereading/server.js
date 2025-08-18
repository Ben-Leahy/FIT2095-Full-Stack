const express = require('express');
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function (req, res) {
    let randomId = Math.round(Math.random() * 100);
    res.render('index.html', { username: "admin",id: randomId});
});
app.listen(8080);

console.log(`To-Do app listening at http://localhost:${8080}`);