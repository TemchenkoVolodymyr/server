const mongoose = require('mongoose');

const burgerSchema = new mongoose.Schema({
  name:String,
  price:Number | String,
  description:String,
  shortDescription:String,
  image:String
})


const Burgers = mongoose.model("burgers", burgerSchema);

module.exports = Burgers
