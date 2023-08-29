const express = require("express");

const booksPizzaRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const booksPizzaFuncs = require('../../controllesFunctionsPizza/Blog/BooksPizzaMeetFuncs')


booksPizzaRouter.route('/')
  .post(booksPizzaFuncs.createBooksPizza)
  .get(booksPizzaFuncs.getAllBooksPizza)





module.exports = booksPizzaRouter;