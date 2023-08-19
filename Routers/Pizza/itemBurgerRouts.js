const express = require("express");

const burgerRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const burgerFunc = require('../../controlles/Pizza/itemsBurgerFucns')


burgerRouter.route('/')
  .post(burgerFunc.createBurger)
  .get(burgerFunc.getAllBurgers)


// pizzaRouter.route('/:id')
//   .get(pizzaFunc.getAllBooks)
//   .delete(pizzaFunc.deleteBook)


module.exports = burgerRouter;
