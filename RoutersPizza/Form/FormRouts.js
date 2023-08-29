const express = require("express");

const formRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const formFuncs = require('../../controllesFunctionsPizza/Form/formFuncs')




formRouter.route('/')
  .post(formFuncs.createForm)



formRouter.route('/:id')
  .get(formFuncs.getForm)
  .delete(formFuncs.deleteForm)



module.exports = formRouter;