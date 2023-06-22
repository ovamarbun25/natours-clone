const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const viewsController = require('../controllers/viewsController');

// router.use();

router.get('/', authController.isLoggedIn,viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTourDetail);
router.get('/login', authController.isLoggedIn, viewsController.getUserLogin);
router.get('/me', authController.protect, viewsController.getAccount);

router.post('/submit-user-data', authController.protect,viewsController.updateUserData);

module.exports = router;