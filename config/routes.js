module.exports = function (app) {
  require('../routes/user.route')(app);
  require('../routes/subject.route')(app);
  require('../routes/training.route')(app);

}