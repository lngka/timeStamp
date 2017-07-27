'use strict';

const express = require('express');
const app = express();

app.get("/", function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }
})

app.listen(3000, function () {
  console.log('Node.js listening ... on ' + process.env.PORT);
});

