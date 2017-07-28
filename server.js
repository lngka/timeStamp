'use strict';

const express = require('express');
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// allow cross origin call
app.use(cors());

// allow public files
app.use('/public', express.static(path.join(__dirname,"public")));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get("/:string", function(req, res) {
   
  // access parameter with req.params.<parameter name>
  var unixDate = Date.parse(req.params.string);
  
  // dateObj.toLocaleDateString([locales [, options]])
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var answer = {
    "unix-time": unixDate,
    "nomal-time": new Date(unixDate).toLocaleDateString("en-US", options)
  };
  res.writeHead(200, {"Content-Type": "JSON"});
  res.end(JSON.stringify(answer));
});


app.listen(process.env.PORT, function () {
  console.log('Node.js listening ... on ' + process.env.PORT);
});

