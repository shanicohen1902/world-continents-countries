var express = require('express');
var logger = require('morgan');
var cors = require('cors')
var continentRouter = require('./routes/continent');
var app = express();

app.use(cors())
app.use(logger('dev'));

//Routing
app.use('/continent',continentRouter);

module.exports = app;

app.listen(8080, function () {
  console.log('app listening on port 8080!')
})