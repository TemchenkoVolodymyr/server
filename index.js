const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const app = express()
const helmet = require('helmet');
const PORT = process.env.PORT || 3000

const http = require('http');
const server = http.createServer(app)

const  io = require('socket.io')(server);

io.on('connection',(socket) => {
console.log("new connection" ,socket.id)
})






app.use(cors());
app.options('*', cors());
app.use(express.json())
mongoose.connect("mongodb+srv://temcenkovova8:brFMAZAjzkX4ighR@cluster0.4dgfzzn.mongodb.net/natours?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('DB connection successful'));

app.use(helmet());

const pizzaRouter = require('./Routers/Pizza/PizzaRouts')
const socialRouter = require('./Routers/SocialCosmos/SocialRouts')
const messageRouter = require('./Routers/SocialCosmos/Messages/MessagesRouts')
const ErrorHandler = require("./APIFeatures/ErrorHandler");


app.get('/', (req, res) => {
  res.end('<h1>TEST</h1>')
})

app.use('/pizza', pizzaRouter)
app.use('/social', socialRouter)
app.use('/message', messageRouter)

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next(new ErrorHandler(`Url with this path ${req.originalUrl} doesnt exist`), 404);
})
console.log(PORT)
io.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})