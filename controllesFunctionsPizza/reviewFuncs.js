const Review = require('../modulesDatabasePizza/reviewsModules');
const catchAsync = require("../APIFeatures/catchAsync");

const RequestFeatures = require("../APIFeatures/ApiFeatures");
// const APIFeatures = require("../after-section-12/utils/apiFeatures");
const factory = require("./HandlerFactory");
// const reviewSchema = require("../modulesDatabase/reviewsModules");
const handlerFactory = require("./HandlerFactory");
// const Tour = require("../modulesDatabase/tourModules");

// exports.createReview = catchAsync(async (req, res, next) => {
//
//
//   if (!req.body.refToTour) req.body.refToTour = req.params.tourId;
//   if (!req.body.refToUser) req.body.refToUser = "64b58ac18b5e50331c2c7116";
//   const newReview = await Review.create({
//
//     review: req.body.review,
//     rating: req.body.rating,
//     refToTour: req.body.refToTour,
//     refToUser: req.body.refToUser
//     // Могу так же просто написать req.body и все , добавить все что есть в req.body и совпадает с схемой ,
//     // если что то не совпадает то оно будет игнорироваться
//
//   })
//
//   res.status(201).json({
//     status: "success",
//     review: {
//       newReview
//     }
//   })
// });

// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };
//   // const features = new RequestFeatures(Review.find(filter), req.query).filter().sort().fields().pagination();
//
//   const features = new APIFeatures(Review.find(filter), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//
//   const doc = await features.query;
//
//   // let getReviews = features.query;
//
//   // const review = await getReviews
//
//   res.status(200).json({
//     status: 'Success',
//     results: features.length,
//     data: {
//       doc
//     }
//   })
// })
exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = "64b58ac18b5e50331c2c7116";
  next()
}  // This is middleware which help me post this conditions between function in rout Review

exports.getAllReviews = factory.getAllHandler(Review);
exports.getReview = factory.getOneHandler(Review);
exports.createReview = factory.createHandler(Review);
exports.updateReview = factory.updateHandler(Review)
exports.deleteReview = factory.deleteHandler(Review)