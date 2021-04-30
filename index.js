var db = require('./config/db')();

var app = require('./config/express')(db);

//Configure express routes
require('./config/routes.js')(app);

var port = 3000;

app.listen(port, function () {
  console.log('Server started on', port);
})