var mongoose = require('mongoose');
var legoSchema =  mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
  bestSeller: Boolean
});

const LegoModel = mongoose.model('LegoToy', legoSchema, 'LegoToy');

module.exports = LegoModel;
