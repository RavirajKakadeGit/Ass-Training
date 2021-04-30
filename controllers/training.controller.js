var mongoose = require('mongoose');
var Training = mongoose.model('Training');
var Subject = mongoose.model('Subject');

module.exports = {

  /**
   * Save Training
   */
  saveTraining: function (req, res, next) {
    let subjects = req.body.subjects;
    Subject.aggregate(
      [
        {
          '$match': {
            'name': {
              '$in': subjects
            }
          }
        }, {
          '$project': {
            '_id': 1
          }
        }
      ]
    ).then(function (data) {
      if (subjects.length !== data.length) {
        let err = new Error();
        err.message = 'Subject not found';
        err.statusCode = 404;
        res.status(err.statusCode).send(err);
      }
      var training = new Training()

      training.name = req.body.name;
      training.type = req.body.type;
      training.subjects = data;
      training.lastModified = req.decoded.user.email;
      return training.save();
    }).then(function (result) {
      res.status(201).send({ status: 'success', message: 'Training details added', data: result });
    }).catch(function (err) {
      err.statusCode = 500;
      err.msg = 'Server Error';
      if (err.code === 11000) {
        err.msg = 'Record already exits';
        err.statusCode = 409;
      }
      res.status(err.statusCode).send(err);
    });
  },

  getAllTraining: async function (req, res, next) {
    let limit = req.query.limit ? req.query.limit : 10;
    let skip = req.query.skip ? req.query.skip : 0;
    let order = -1;

    //Get All Training
    let match = {};

    //Get Training – Filtered by Type
    if (req.query.type) {
      match.type = req.query.type
    }

    //Get Training – Filtered by Name
    if (req.query.name) {
      match.name = req.query.name
    }

    //Get Training – Filtered by Stream 
    if (req.query.stream) {
      var ids = new Array();
      let subDetails = await Subject.aggregate([
        {
          '$match': {
            stream: req.query.stream
          }
        },
        {
          '$project': {
            _id: 1
          }
        }
      ]);
      if (subDetails.length > 0) {
        subDetails.forEach(function (v, k) {
          ids.push(mongoose.Types.ObjectId(v._id))
        });
        match.subjects = {
          $in: ids
        };
      } else {
        let err = new Error();
        err.message = 'Stream not found';
        err.statusCode = 404;
        res.status(err.statusCode).send(err);
      }
    }

    //Get Training – Filtered by Subject 
    if (req.query.subject) {
      var ids = new Array();
      let subDetails = await Subject.aggregate([
        {
          '$match': {
            name: req.query.subject
          }
        },
        {
          '$project': {
            _id: 1
          }
        }
      ]);
      if (subDetails.length > 0) {
        subDetails.forEach(function (v, k) {
          ids.push(mongoose.Types.ObjectId(v._id))
        });
        match.subjects = {
          $in: ids
        };
      } else {
        let err = new Error();
        err.message = 'Subject not found';
        err.statusCode = 404;
        res.status(err.statusCode).send(err);
      }
    }


    if (req.asc) {
      order = 1;
    }
    Training.aggregate([
      {
        '$match': match
      },
      { '$sort': { 'name': order } },
      {
        '$facet': {
          'metadata': [
            {
              '$count': 'total'
            }, {
              '$addFields': {
                'page': 1
              }
            }
          ],
          'result': [
            {
              '$skip': skip
            }, {
              '$limit': limit
            }
          ]
        }
      }, {
        '$unwind': {
          'path': '$metadata',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$project': {
          'docs': '$result',
          'totalDocs': '$metadata.total',
          'currentDocs': {
            '$size': '$result'
          },
          'limit': {
            '$literal': limit
          },
          'page': {
            '$literal': ((skip / limit) + 1)
          },
          'pages': {
            '$ceil': {
              '$divide': [
                '$metadata.total', limit
              ]
            }
          }
        }
      }]).then(function (data) {
        let formatRes = data && data[0];
        if (formatRes.length === 0) {
          let err = new Error();
          err.message = 'Data found';
          err.statusCode = 404;
          res.status(err.statusCode).send(err);
        }
        res.status(200).send({ status: 'success', message: 'Successfully retrieved Trainings', data: formatRes });
      }).catch(function (err) {
        res.status(err.statusCode).send(err);
      });;
  }
}