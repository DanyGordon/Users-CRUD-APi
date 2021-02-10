const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: {
    type: String,
    require: true
  },
  year: {
    type: Number,
    require: true
  },
  carNumber: {
    type: String,
    require: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Cars = mongoose.model('Car', carSchema);
module.exports = Cars;