const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isBoolean = require("validator/es/lib/isBoolean");
const socialSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "The user must have a name"],
    unique: true,
    trim: true
  },
  password:{
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    trim: true,
  },
  confirmPassword:{
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  email:{
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  date:String,
  isOnline:Boolean
})


socialSchema.pre('save', async function(next) {

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});


socialSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword,userPassword)
}
const Social = mongoose.model("socials", socialSchema);
module.exports = Social