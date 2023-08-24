const express = require('express')
const mongoose = require("mongoose");
const corss = require('cors');
const app = express()
const helmet = require('helmet');
const PORT = process.env.PORT || 3000
const http = require('http')

const {Server} = require('socket.io')
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH"]
  }
});

let onlineUsers = []

io.on('connection', (socket) => {

  socket.on('addNewUser', (userId) => {
    !onlineUsers.some(user => user.userId === userId) &&
    onlineUsers.push({
      userId,
      socketId: socket.id
    });
    io.emit("getOnlineUsers", onlineUsers)
  });
  //add message
  socket.on('sendMessage', (message) => {
console.log(onlineUsers)
    console.log(message)
    const user = onlineUsers.find(user => user.userId === message.recipientId)
    console.log(user)
    if (user) {
      io.to(user.socketId).emit("getMessage", message)
      console.log(message)
    }

  })
  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    io.emit("getOnlineUsers", onlineUsers)

  })
})


app.use(corss());
app.options('*', corss());
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
const dialogsRouter = require('./Routers/SocialCosmos/Messages/Dialogs/DialogsRouters')

app.get('/', (req, res) => {
  res.end('<h1>TEST</h1>')
})

app.use('/pizza', pizzaRouter)
app.use('/social', socialRouter)
app.use('/message', messageRouter)
app.use('/dialogs', dialogsRouter)

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next(new ErrorHandler(`Url with this path ${req.originalUrl} doesnt exist`), 404);
})
console.log("My port is ", PORT)
server.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})