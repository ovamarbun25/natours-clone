const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch(
  '/updateMyData',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMyData
);
router.delete('/deleteMyData', userController.deleteMyData);

router.get('/me', userController.getMyData, userController.getUser);

//Restrict these routes to admin only
router.use(authController.restrictTo('admin'));

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
