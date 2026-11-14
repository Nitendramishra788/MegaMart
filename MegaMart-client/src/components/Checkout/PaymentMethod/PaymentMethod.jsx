import React, { useState } from "react";
import "./PaymentMethod.css";
import CardDetails from "../CardDetails/CardDetails";

function PaymentMethod() {

  const [selectedPayment, setSelectedPayment] = useState("card");

  const paymentMethods = [
    {
      id: "card",
      title: "Credit / Debit Card",
      description: "Pay securely using your card",
      icon: "💳",
    },
    {
      id: "upi",
      title: "UPI",
      description: "Google Pay, PhonePe, Paytm",
      icon: "📱",
    },
    {
      id: "netbanking",
      title: "Net Banking",
      description: "All major banks supported",
      icon: "🏦",
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      description: "Pay when your order arrives",
      icon: "💵",
    },
  ];

  return (
    <section className="paymentMethod">

      {/* Header */}

      <div className="paymentMethodHeader">
        <h2>Payment Method</h2>
        <p>Choose your preferred payment method</p>
      </div>

      {/* Payment Options */}

      <div className="paymentMethodList">

        {paymentMethods.map((method) => (

          <div
            key={method.id}
            className={`paymentOption ${
              selectedPayment === method.id ? "selectedPayment" : ""
            }`}
            onClick={() => setSelectedPayment(method.id)}
          >

            <div className="paymentOptionLeft">

              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={() => setSelectedPayment(method.id)}
              />

              <div className="paymentOptionIcon">
                {method.icon}
              </div>

              <div className="paymentOptionDetails">
                <h3>{method.title}</h3>
                <p>{method.description}</p>
              </div>

            </div>

          </div>

        ))}

      </div>
      {selectedPayment === "card" && <CardDetails />}

    </section>
  );
}

export default PaymentMethod;