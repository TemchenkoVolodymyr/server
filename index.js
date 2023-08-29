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

    const user = onlineUsers.find(user => user.userId === message.recipientId)

    if (user) {

      // io.to(user.socketId).emit("getMessage", message)
      socket.broadcast.emit("receive_message", message)

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


const tourRouter = require('./RoutersPizza/TourRouts');
const userRouter = require('./RoutersPizza/UserRouts');
const reviewRouter = require('./RoutersPizza/ReviewRouts');
const bookRouter = require('./RoutersPizza/BookRouts');
const hireMeRouter = require("./RoutersPizza/HireMeRouts");
const pizzaRouterPizza = require("./RoutersPizza/Pizza/PizzaRouts");
const drinkRouter = require("./RoutersPizza/Pizza/ItemDrinkRouts");
const burgerRouter = require("./RoutersPizza/Pizza/itemBurgerRouts");
const pastaRouter = require("./RoutersPizza/Pizza/itemPastaRouts");
const blogRouter = require("./RoutersPizza/Blog/BlogRouts")
const arabicMeetRouter = require("./RoutersPizza/Blog/ArabicMeetRouts")
const booksPizzaRouter = require("./RoutersPizza/Blog/BooksPizzaRouts")
const formRouter = require("./RoutersPizza/Form/FormRouts")
app.get('/', (req, res) => {
  res.end('<h1>TEST</h1>')
})

app.use('/pizza', pizzaRouter)
app.use('/social', socialRouter)
app.use('/message', messageRouter)
app.use('/dialogs', dialogsRouter)

app.use("/api/v1/tours", tourRouter);
app.use('/api/v1/users', userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/hireMe", hireMeRouter);
app.use("/api/v1/pizza", pizzaRouterPizza);
app.use("/api/v1/drink", drinkRouter);
app.use("/api/v1/pasta", pastaRouter);
app.use("/api/v1/burger", burgerRouter);
app.use("/api/v1/italianMeet", blogRouter);
app.use("/api/v1/arabicMeet", arabicMeetRouter);
app.use("/api/v1/booksPizzaMeet", booksPizzaRouter);
app.use("/api/v1/form", formRouter);

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next(new ErrorHandler(`Url with this path ${req.originalUrl} doesnt exist`), 404);
})
console.log("My port is ", PORT)
server.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})