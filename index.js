const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const app = express()
const helmet = require('helmet');
const PORT =  process.env.PORT || 3000

app.use(cors());
app.options('*', cors());
app.use(express.json())
mongoose.connect("mongodb+srv://temcenkovova8:brFMAZAjzkX4ighR@cluster0.4dgfzzn.mongodb.net/natours?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
}).then(() => console.log('DB connection successful'));

app.use(helmet());

const pizzaRouter = require('./Routers/Pizza/PizzaRouts')
const socialRouter = require('./Routers/SocialCosmos/SocialRouts')
const ErrorHandler = require("./APIFeatures/ErrorHandler");
const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
  max: 500,
  windowMs:60*60*1000,
  message:"Too many requests, try again later"
});


app.use('/',limiter)
app.get('/', (req,res) => {
  res.end('<h1>TEST</h1>')
})

app.use('/pizza',pizzaRouter)
app.use('/social',socialRouter)

app.all('*', (req, res,next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next(new ErrorHandler(`Url with this path ${req.originalUrl} doesnt exist`),404);
})
app.use((err,req,res,next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })

  next()
})
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})