import "./OrderItem.css";

function OrderItem() {
  return (
    <div className="orderItem">
      <div className="orderItemImage">
        <img src="/bannerA.png" alt="Product" />
      </div>

      <div className="orderItemDetails">
        <h3>ASUS ROG Strix G16</h3>

        <p className="orderItemVariant">
          Color: Eclipse Gray | RAM: 16GB
        </p>

        <div className="orderItemBottom">
          <span>Qty: 1</span>
          <strong>₹89,990</strong>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;