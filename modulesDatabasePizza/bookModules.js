const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
   idTour:String,
   idUser:String,
   date:String,
   phone:Number,
})


const Books = mongoose.model("Books", bookSchema);

module.exports = Books