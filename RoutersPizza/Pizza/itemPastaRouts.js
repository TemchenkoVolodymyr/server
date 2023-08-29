const express = require("express");

const pastaRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const pastaFunc = require('../../controllesFunctionsPizza/Pizza/itemsPastaFucns')


pastaRouter.route('/')
  .post(pastaFunc.createPasta)
  .get(pastaFunc.getAllPastas)


// pizzaRouter.route('/:id')
//   .get(pizzaFunc.getAllBooks)
//   .delete(pizzaFunc.deleteBook)


module.exports = pastaRouter;