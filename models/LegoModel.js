var mongoose = require('mongoose');
var legoSchema =  mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
  bestSeller: Boolean,
  category: {
    type: String,
    enum: ["babydoll", "babydoll2", "babydoll3"]
  }
});

const LegoModel = mongoose.model('LegoToy', legoSchema, 'LegoToy');

module.exports = LegoModel;
