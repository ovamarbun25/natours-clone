const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const handleFactory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.getMyData = (req, res, next) => {
  req.params.id = req.user.id
  next();
}

exports.updateMyData = catchAsync(async (req, res, next) => {
  //1) Create if the user try to change their password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates, please use /updateMyPassword',
        400
      )
    );
  }

  //2) Filtere the needed fields
  const filteredBody = filterObj(req.body, 'name', 'email');

  //3) Update user's document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMyData = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! Please use /signup instead.'
  });
};

exports.getAllUsers = handleFactory.getAllDocuments(User);

exports.getUser = handleFactory.getOneDocument(User);

exports.updateUser = handleFactory.updateOneDocument(User);

exports.deleteUser = handleFactory.deleteOneDocument(User);
