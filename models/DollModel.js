var mongoose = require("mongoose");
var dollSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
  bestSeller: Boolean,
  category:  String,

});

const DollModel = mongoose.model("DollToy", dollSchema, "DollToy");

module.exports = DollModel;
