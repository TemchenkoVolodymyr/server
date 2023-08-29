const mongoose = require('mongoose');

const arabicMeetSchema = new mongoose.Schema({
  author:String,
  date:String | Date,
  comment:String
})


const ArabicMeets = mongoose.model("arabicmeets", arabicMeetSchema);

module.exports = ArabicMeets