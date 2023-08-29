const mongoose = require('mongoose');

const booksPizzaMeetSchema = new mongoose.Schema({
  author: String,
  date: String | Date,
  comment: String
})


const BooksPizzaMeets = mongoose.model("bookspizzameets", booksPizzaMeetSchema);

module.exports = BooksPizzaMeets