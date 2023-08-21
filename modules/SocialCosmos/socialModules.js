const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const socialSchema = new mongoose.Schema({
  name:String,
  password:String,
  confirmPassword:String,
  email:String,
  date:String
})


socialSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword,userPassword)
}
const Social = mongoose.model("socials", socialSchema);
module.exports = Social