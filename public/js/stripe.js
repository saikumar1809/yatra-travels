/*eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';
//const Stripe = require('stripe');

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51IsWvJSIBMUzmCHzEkMjyscDgObxXCACq0r8VJAKrCAfRHUqoANlOcJWzMWPD7dyZz2gJXuYEpZxWNCtSkc10EDf00Q2KOoGS0'
    );
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + chanre credit card
    console.log(session.data.session.id);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err.message);
    showAlert('error', err);
  }
};
