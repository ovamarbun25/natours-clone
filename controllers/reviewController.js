const Review = require('./../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const handleFactory = require('./handlerFactory');


exports.setTourUserId = (req, res, next) => {
  //nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = handleFactory.getAllDocuments(Review)

exports.getReview = handleFactory.getOneDocument(Review);

exports.createReview = handleFactory.createOneDocument(Review);

exports.deleteReview = handleFactory.deleteOneDocument(Review);

exports.updateReview = handleFactory.updateOneDocument(Review);
