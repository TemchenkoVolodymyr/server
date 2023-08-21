const express = require("express");

const socialRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const socialFunc = require('../../controlles/SocialCosmos/socialFunc')
const auth = require('../../APIFeatures/Authorization')

socialRouter.route('/')
  .get(socialFunc.getAllSocial)
  .post(auth.signup)
  .delete(socialFunc.deleteSocial)


socialRouter.post('/login',auth.login);
socialRouter.patch('/:id',auth.editUser)


module.exports = socialRouter;