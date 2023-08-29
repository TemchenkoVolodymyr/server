const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  author:String,
  date:String | Date,
  comment:String
})


const Blogs = mongoose.model("blogs", blogSchema);

module.exports = Blogs