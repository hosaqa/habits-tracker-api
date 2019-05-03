// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
  //move on
    next();
  }
});

MongoClient.connect(db.url, (err, database) => {
  if (err) 
    return console.log(err)
  require('./app/routes')(app, database.db('lets_do_it'));
  app.listen(port, () => {
    console.log('We are live on ' + port);
    //console.log(database.db('hsqdb').collection('notes'))
  });
})