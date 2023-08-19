
const express = require("express");

const drinkRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const drinkFunc = require('../../controlles/Pizza/itemsDrinkFucns')


drinkRouter.route('/')
  .post(drinkFunc.createDrink)
  .get(drinkFunc.getAllDrinks)


// pizzaRouter.route('/:id')
//   .get(pizzaFunc.getAllBooks)
//   .delete(pizzaFunc.deleteBook)


module.exports = drinkRouter;