const express = require("express");

const arabicMeetRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const arabicMeetFuncs = require('../../controllesFunctionsPizza/Blog/ArabicFriedMeetFuncs')


arabicMeetRouter.route('/')
  .post(arabicMeetFuncs.createArabicMeet)
  .get(arabicMeetFuncs.getAllArabicMeets)



module.exports = arabicMeetRouter;