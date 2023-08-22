const mongoose = require('mongoose');
const messagesSchema = new mongoose.Schema({
  idUser: String,
  message: String,
  date: String,
  author:String

})


const Messages = mongoose.model("messages", messagesSchema);
module.exports = Messages