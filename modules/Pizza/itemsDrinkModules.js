
const mongoose = require('mongoose');

const drinksSchema = new mongoose.Schema({
  name:String,
  price:Number | String,
  description:String,
  shortDescription:String,
  image:String
})


const Drinks = mongoose.model("drinks", drinksSchema);

module.exports = Drinks