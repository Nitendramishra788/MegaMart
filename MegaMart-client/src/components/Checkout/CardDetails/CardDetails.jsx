import React, { useState } from "react";
import "./CardDetails.css";

function CardDetails() {

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  return (
    <div className="cardDetails">

      <h3>Card Details</h3>

      {/* Cardholder Name */}
      <div className="cardInputGroup">
        <label>Cardholder Name</label>

        <input
          type="text"
          placeholder="Name on card"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
      </div>

      {/* Card Number */}
      <div className="cardInputGroup">
        <label>Card Number</label>

        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={19}
        />
      </div>

      {/* Expiry and CVV */}
      <div className="cardInputRow">

        <div className="cardInputGroup">
          <label>Expiry Date</label>

          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            maxLength={5}
          />
        </div>

        <div className="cardInputGroup">
          <label>CVV</label>

          <input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={4}
          />
        </div>

      </div>

      {/* Save Card */}
      <label className="saveCardOption">

        <input
          type="checkbox"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
        />

        <span>Save card for future purchases</span>

      </label>

    </div>
  );
}

export default CardDetails;