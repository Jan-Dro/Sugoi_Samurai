import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm({ total }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure Stripe has loaded
    if (!stripe || !elements) {
      return;
    }

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Handle the payment on your server
    const response = await fetch('/api/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: paymentMethod.id,
        amount: total * 100, // Convert total to cents (Stripe uses cents)
        currency: 'usd', // Change to your currency if needed
      }),
    });

    if (response.ok) {
      // Payment successful
      console.log('Payment succeeded!');
      // You can reset the cart or redirect to a success page here
    } else {
      // Payment failed
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${total}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default CheckoutForm;