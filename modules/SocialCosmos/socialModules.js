const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const socialSchema = new mongoose.Schema({
  name:String,
  password:{
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
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