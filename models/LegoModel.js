var mongoose = require('mongoose');
var legoSchema =  mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
  bestSeller: Boolean,
  category:  String,
});

const LegoModel = mongoose.model('LegoToy', legoSchema, 'LegoToy');

module.exports = LegoModel;
