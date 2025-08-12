var http = require("http");
var fs = require("fs");
//TODO: let's start with the basic version, and then let's try and dynamically update the currentWeek.html
http
  .createServer(function (req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`); // the pathname is everything after the base.
    const { pathname } = url;
    console.log("pathname: " + pathname); // This is the path after the stem
    console.log("req.url: " + req.url); // This is the path after the stem
    console.log("req.headers.host: " + req.headers.host); //This is the stem

    let fileName = "";
    switch (pathname) {
      case "/":
        fileName = "./views/index.html";
        break;
      case "/assessments":
        fileName = "./views/assessments.html";
        break;
      case "/topics":
        fileName = "./views/topics.html";
        break;
      case "/currentWeek":
        fileName = "./views/currentWeek.html";
        q = url.searchParams;
        d = parseInt(q.get("d"));
        m = parseInt(q.get("m"));
        y = parseInt(q.get("y"));
        result = getDaysDiff(d, m, y);
        msg = `The current week is:   ${result}`;
        res.end(msg);
        return; // This is bad coding practice. -> we will learn how to do this better later.
      default:
        fileName = "/testerror.html";
        break;
    }
    fs.readFile(fileName, function (error, content) {
      if (error) {
        // if an error (not null) occurred while reading the file such as file not found
        console.log(`Sorry we got an error, error:  ${error}`);
      } else {
        // there is no error
        res.end(content); // send the content of the file (either index or info) to the client
      }
    });
  })
  .listen(8080); // this is the port number

/**
 *
 * @param {day} d
 * @param {month} m
 * @param {year} y
 * @returns week number since August 3,2020; returns -1 if the input is before 3rd of August 2020
 */

function getDaysDiff(d, m, y) {
  let returnValue = -1;
  let currentDay = new Date(y, m, d);
  //let currentDay = new Date(); // this already returns the current date, and we only need to incremement month

  let firstDay = new Date(2025, 7, 28); // first day in semester 2
  if (currentDay >= firstDay) {
    var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference
    returnValue = Math.floor(diffDays / 7) + 1;
  }
  return returnValue;
}
