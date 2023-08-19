const express = require('express')
const mongoose = require("mongoose");

const app = express()

const PORT =  process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
}).then(() => console.log('DB connection successful'));



// const pizzaRouter = require('./Routers/Pizza/PizzaRouts')
app.get('/', (req,res) => {
  res.end('<h1>TEST</h1>')
})

// app.use('/pizza',pizzaRouter)
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})