import axios from 'axios';
import { showAlert } from './alert';
import catchAsync from '../../utils/catchAsync';
const Stripe = require('stripe');

const stripe = Stripe(
  'pk_test_51NLLPnKrepZ3WoqW76asiNYghReUbsiBvf4dir5OH8ekuT5jvSmWp2iE3d9V2WqpGTjw1s2uDn7punMcwgub98b900lbUE5eQW'
);

export const bookTour = async tourId => {
  try {
    //1) GET checkout session(stripe) from API
    const session = await axios(
      `http://localhost:9005/api/v1/bookings/checkout-session/${tourId}`
    );

    console.log(session);
    //2) Create checkout form + charge CC using stripe'
    if (session) window.location.href = session.data.session.url;
    // res.redirect(303, session.data.session.url);
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
