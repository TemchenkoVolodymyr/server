
const mongoose = require('mongoose');

const pastaSchema = new mongoose.Schema({
  name:String,
  price:Number | String,
  description:String,
  shortDescription:String,
  image:String
})


const Pastas = mongoose.model("pastas", pastaSchema);

module.exports = Pastas