import "./CheckoutActions.css";

function CheckoutActions() {
  return (
    <div className="checkoutActions">
      <button className="backToCartBTN">
        ← Back to Cart
      </button>

      <button className="placeOrderBTN">
        Place Order →
      </button>
    </div>
  );
}

export default CheckoutActions;