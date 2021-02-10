const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    default: ''
  },
  cars: [
    { type: Schema.Types.ObjectId, ref: 'Car' }
  ]
});

const Users = mongoose.model('User', userSchema);
module.exports = Users;