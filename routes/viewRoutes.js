const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const viewsController = require('../controllers/viewsController');

const router = express.Router();
router.use(viewsController.alerts);

router.get(
  '/',
  // bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get(
  '/tour/:slug',
  authController.isLoggedIn,
  viewsController.getTourDetail
);
router.get('/login', authController.isLoggedIn, viewsController.getUserLogin);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
