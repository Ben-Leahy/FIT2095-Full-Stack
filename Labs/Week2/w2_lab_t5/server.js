var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`); // the pathname is everything after the base.
    const { pathname } = url;

    let fileName = "";
    switch (pathname) {
      case "/run": //if a request like http://localhost:8080 arrives (no pathname)
        q = url.searchParams;
        n1 = parseInt(q.get("n1"));
        n2 = parseInt(q.get("n2"));
        operation = q.get("opt");
        let result = 0;
        let op_symbol = "";
        switch (operation) {
          case "div":
            result = n1 / n2;
            op_symbol = "/";
            break;
          case "multi":
            result = n1 * n2;
            op_symbol = "*";
            break;
          case "add":
            result = n1 + n2;
            op_symbol = "+";
            break;
          case "sub":
            result = n1 - n2;
            op_symbol = "-";
            break;
        }
        msg = `${n1} ${op_symbol} ${n2} = ${result}`;
        res.end(msg); // send it back to the client
        return; // end this callback
    }
  })
  .listen(8080); // this is the port number
