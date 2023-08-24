const mongoose = require('mongoose')
const dialogsSchema = new mongoose.Schema({
  chatId:String,
  senderId:String,
  text:String
},{
  timestamps:true
});

const dialogsModules = mongoose.model("Dialogs",dialogsSchema)
module.exports = dialogsModules