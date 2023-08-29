const express = require("express");
const authController = require('../controllesFunctionsPizza/userFuncs')
const reviewRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)
const handlerFactory = require('../controllesFunctionsPizza/HandlerFactory')
const reviewFunc = require('../controllesFunctionsPizza/reviewFuncs')
const reviewSchema = require('../modulesDatabasePizza/reviewsModules')

reviewRouter.route('/')
  .post(reviewFunc.setTourUserIds, reviewFunc.createReview) // Тут добавил middleware setTourUserIds для того что бы передать в функцию createReview две проверки
  .get( reviewFunc.getAllReviews)


reviewRouter.route('/:id')
  .delete(reviewFunc.deleteReview)
  .patch(reviewFunc.updateReview)
  .get(reviewFunc.getReview)
module.exports = reviewRouter;