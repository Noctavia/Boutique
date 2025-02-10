import React, { useState } from 'react';
import './PaymentForm.css';

const PaymentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && cardNumber.length === 16 && expiry && cvc.length === 3) {
      setIsPaid(true);
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
  };

  return (
    <div className="payment-container">
      <h1>Processus de Paiement</h1>
      {isPaid ? (
        <div className="confirmation">✅ Paiement effectué avec succès !</div>
      ) : (
        <form onSubmit={handlePayment} className="payment-form">
          <label>Nom sur la carte</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jean Dupont"
            required
          />

          <label>Numéro de carte</label>
          <input
            type="text"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="1234 5678 9012 3456"
            required
          />

          <div className="row">
            <div>
              <label>Expiration</label>
              <input
                type="text"
                maxLength={5}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>

            <div>
              <label>CVC</label>
              <input
                type="text"
                maxLength={3}
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                required
              />
            </div>
          </div>

          <button type="submit">Payer</button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
