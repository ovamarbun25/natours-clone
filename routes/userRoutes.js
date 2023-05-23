const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch(
  '/updateMyData',
  authController.protect,
  userController.updateMyData
);
router.delete(
  '/deleteMyData',
  authController.protect,
  userController.deleteMyData
);

router.get(
  '/me',
  authController.protect,
  userController.getMyData,
  userController.getUser
);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
