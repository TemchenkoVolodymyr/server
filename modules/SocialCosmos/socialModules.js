const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const socialSchema = new mongoose.Schema({
  name:String,
  password:String,
  confirmPassword:String,
  email:String,
  date:String
})

socialSchema.pre('save', async function(next) {

  // if (!this.isModified('password')) return next();


  this.password = await bcrypt.hash(this.password, 12);


  this.passwordConfirm = undefined;
  next();
});


socialSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword,userPassword)
}
const Social = mongoose.model("socials", socialSchema);
module.exports = Social