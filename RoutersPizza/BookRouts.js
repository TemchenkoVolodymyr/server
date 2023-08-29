const express = require("express");

const bookRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const bookFuncs = require('../controllesFunctionsPizza/bookFuncs')



bookRouter.route('/')
   .post(bookFuncs.createBook)
   // .get(bookFuncs.getAllBooks)


bookRouter.route('/:id')
   .get(bookFuncs.getAllBooks)
   .delete(bookFuncs.deleteBook)



module.exports = bookRouter;