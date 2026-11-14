import React from "react";
import "./CheckoutHeader.css";

function CheckoutHeader() {
  const steps = [
    { id: 1, title: "Shipping" },
    { id: 2, title: "Payment" },
    { id: 3, title: "Confirmation" },
  ];

  return (
    <section className="checkoutHeader">

      {/* Left Section */}
      <div className="checkoutHeaderLeft">

        <div className="checkoutCheckIcon">
          ✓
        </div>

        <div className="checkoutHeading">
          <h1>Checkout</h1>
          <p>Complete your purchase securely</p>
        </div>

      </div>

      {/* Right Section */}
      <div className="checkoutSteps">

        {steps.map((step, index) => (
          <React.Fragment key={step.id}>

            <div className="checkoutStep">

              <div
                className={`checkoutStepCircle ${
                  step.id === 1 ? "active" : ""
                }`}
              >
                {step.id}
              </div>

              <span
                className={`checkoutStepTitle ${
                  step.id === 1 ? "activeText" : ""
                }`}
              >
                {step.title}
              </span>

            </div>

            {index !== steps.length - 1 && (
              <div
                className={`checkoutStepLine ${
                  step.id === 1 ? "activeLine" : ""
                }`}
              ></div>
            )}

          </React.Fragment>
        ))}

      </div>

    </section>
  );
}

export default CheckoutHeader;