const express = require("express");

const hireMeRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const hireMeFuncs = require('../controllesFunctionsPizza/HireMeFuncs')



hireMeRouter.route('/')
   .get(hireMeFuncs.getOrders)
   .post(hireMeFuncs.setNewOrder)




module.exports = hireMeRouter;