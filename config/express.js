var express = require('express');
var bodyParser = require('body-parser');
//var busboy = require('connect-busboy');

module.exports = function () {

  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  //app.use(busboy({ immediate: true }));

  return app;
}