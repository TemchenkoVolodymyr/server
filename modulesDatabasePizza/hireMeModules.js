const mongoose = require('mongoose');

const hireMeSchema = new mongoose.Schema({
   email:String,
   firstName:String,
   lastName:String,
   subject:String,
   message:String,
   date:String
})


const HireMe = mongoose.model("Hire", hireMeSchema);

module.exports = HireMe