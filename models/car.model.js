const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  carNumber: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Cars = mongoose.model('Car', carSchema);
module.exports = Cars;