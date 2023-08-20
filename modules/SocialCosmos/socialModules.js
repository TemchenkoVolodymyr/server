const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  name:String,
  password:String,
  confirmPassword:String,
  email:String,
  date:String
})


const Social = mongoose.model("socials", socialSchema);

module.exports = Social