const mongoose = require('mongoose');
// const messagesSchema = new mongoose.Schema({
//   idUser: String,
//   message: String,
//   date: String,
//   author:String,
//   recipientId:String
//
// })
const messagesSchema = new mongoose.Schema(
  {
    members: Array,
    interlocutor:Array,
  },
  {
    timestamps: true
  }
)


const Messages = mongoose.model("messages", messagesSchema);
module.exports = Messages