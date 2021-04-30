var training = require('../controllers/training.controller');
var isView = require('../middlewares/isView');
var isAdmin = require('../middlewares/isAdmin');

module.exports = function (app) {

  app.route('/api/v1/training')
    .post(isAdmin, training.saveTraining); 

  app.route('/api/v1/training')
    .get(isView, training.getAllTraining);
};