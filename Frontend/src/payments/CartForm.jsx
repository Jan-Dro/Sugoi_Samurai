import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm({ total }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      return;
    }

    const response = await fetch('/api/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: paymentMethod.id,
        amount: total * 100, 
        currency: 'usd', 
      }),
    });

    if (response.ok) {
      console.log('Payment succeeded!');
    } else {
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