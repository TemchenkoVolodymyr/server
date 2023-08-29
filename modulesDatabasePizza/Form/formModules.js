const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  date: String,
  name: String,
  message: String,
  email: String
})


const Form = mongoose.model("forms", formSchema);

module.exports = Form