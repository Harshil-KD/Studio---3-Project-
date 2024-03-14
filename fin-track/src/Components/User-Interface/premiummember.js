import React, { useState } from 'react';
import firebase from '../firebase';

function BecomePremiumModal({ onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Process the premium membership request
    try {
      // Your code to handle premium membership request, e.g., updating user data in Firebase
      await firebase.database().ref('users').child(firebase.auth().currentUser.uid).update({
        isPremium: true,
        paymentMethod: paymentMethod
      });

      alert('Thank you for becoming a premium member!');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error upgrading to premium membership:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Become a Premium Member</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Payment Method:
            <input type="text" value={paymentMethod} onChange={handlePaymentMethodChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BecomePremiumModal;
