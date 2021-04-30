var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var saltRounds = 10;

var baseSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['admin', 'view']
  }
});

baseSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

mongoose.model('User', new mongoose.Schema(baseSchema,
  { collection: 'User', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)); 