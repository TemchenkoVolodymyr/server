const catchAsync = require("../APIFeatures/catchAsync");
const ErrorHandler = require("../APIFeatures/ErrorHandler");
const Users = require("../modulesDatabasePizza/userModules");
const Tour = require("../modulesDatabasePizza/tourModules");
const RequestFeatures = require("../APIFeatures/ApiFeatures");

exports.deleteHandler = Model => catchAsync(async (req, res, next) => {

  const id = req.params.id
  const doc = await Model.findByIdAndDelete(id);

  if (!doc) {
    return next(new ErrorHandler('No document found by ID to delete', 404))
  }
  res.status(200).json({
    status: 'Delete is done',
    message: null
  })
})

exports.updateHandler = Model => catchAsync(async (req, res, next) => {

  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true
  });

  if (!doc) {
    return next(new ErrorHandler('No document found by ID to update', 400))
  }
console.log(doc)
  res.status(200).json({
    status: 'success',
    data: {
      date: doc
    }
  })
})

exports.createHandler = Model => catchAsync(async (req, res, next) => {

  console.log(req.body)

  if (!req.body.refToTour) req.body.refToTour = req.params.tourId;
  if (!req.body.refToUser) req.body.refToUser = "64b58ac18b5e50331c2c7116";

  const doc = await Model.create(req.body); // метод create создает запись в датабейс.
console.log('s')
  if (!doc) {
    return next(new ErrorHandler('No document found by ID to create', 400))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
})

exports.getAllHandler = Model => catchAsync(async (req, res, next) => {

  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  if(req.params.id) filter = {idUser:req.params.id}

  const documents = new RequestFeatures(Model.find(filter), req.query).filter().sort().fields().pagination();
  if (!documents) {
    next(new ErrorHandler("No documents found by ID to find"), 400)
  }
  let doc = await documents.query

  // SEND REQUEST
  const result = await doc

  res.status(200).json({
    status: 'Success',
    results: result.length,
    data: {
      result
    }
  })
})


exports.getOneHandler = (Model, populateOptions) => catchAsync(async (req, res, next) => {

  const param = req.params.id
  let query = Model.findById(param);

  if (populateOptions) {
    query =  query.populate(populateOptions)
  }
  const doc = await query


  if (!doc) {
    return next(new ErrorHandler('No doc found by ID', 404))
  }

  res.status(200).json({
    status: 'Success',
    data: {
      doc
    }
  })
})