const express = require("express");

const pizzaRouter = express.Router({mergeParams: true});


const pizzaFunc = require('../../controllesFunctionsPizza/Pizza/pizzaFuncs')


pizzaRouter.route('/')
  .post(pizzaFunc.createPizza)
  .get(pizzaFunc.getAllPizzas)


// pizzaRouter.route('/:id')
//   .get(pizzaFunc.getAllBooks)
//   .delete(pizzaFunc.deleteBook)


module.exports = pizzaRouter;