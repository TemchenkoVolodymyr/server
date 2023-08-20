const express = require("express");

const socialRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const socialFunc = require('../../controlles/SocialCosmos/socialFunc')
const auth = require('../../APIFeatures/Authorization')

socialRouter.route('/')
  .get(socialFunc.getAllSocial)
  .post(socialFunc.createSocial)
  .delete(socialFunc.deleteSocial)
socialRouter.route('/signup')
  .post(auth.signup)



module.exports = socialRouter;