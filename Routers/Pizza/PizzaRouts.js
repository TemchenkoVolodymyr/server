const express = require("express");

const pizzaRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const pizzaFunc = require('../../controlles/Pizza/pizzaFuncs')


pizzaRouter.route('/')
  .get(pizzaFunc.getAllPizzas)
  .post(pizzaFunc.createPizza)



module.exports = pizzaRouter;