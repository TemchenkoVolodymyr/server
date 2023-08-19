
const RequestFeatures = require('../APIFeatures/ApiFeatures')
exports.deleteHandler = Model => (async (req, res, next) => {

  const id = req.params.id
  const doc = await Model.findByIdAndDelete(id);

  res.status(200).json({
    status: 'Delete is done',
    message: null
  })
})

exports.updateHandler = Model => (async (req, res, next) => {

  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      date: doc
    }
  })
})

exports.createHandler = Model => (async (req, res, next) => {

  console.log(req.body)

  if (!req.body.refToTour) req.body.refToTour = req.params.tourId;
  if (!req.body.refToUser) req.body.refToUser = "64b58ac18b5e50331c2c7116";

  const doc = await Model.create(req.body); // метод create создает запись в датабейс.


  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
})

exports.getAllHandler = Model => (async (req, res, next) => {

  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  if(req.params.id) filter = {idUser:req.params.id}

  const documents = new RequestFeatures(Model.find(filter), req.query).filter().sort().fields().pagination();
  let doc = await documents.query
console.log(doc)
  // SEND REQUEST
  const result = await doc

  res.status(200).json({
    status: 'sss',
    results: result.length,
    data: {
      result
    }
  })
})


exports.getOneHandler = (Model, populateOptions) => (async (req, res, next) => {

  const param = req.params.id
  let query = Model.findById(param);

  if (populateOptions) {
    query =  query.populate(populateOptions)
  }
  const doc = await query

  res.status(200).json({
    status: 'Success',
    data: {
      doc
    }
  })
})