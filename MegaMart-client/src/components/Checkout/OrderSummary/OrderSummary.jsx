import "./OrderSummary.css";
import OrderItem from "./OrderItem";

function OrderSummary() {
    return (
        <section className="orderSummary">
            <div className="orderSummaryHeader">
                <h2>Order Summary</h2>
                <span>1 Item</span>
            </div>

            <div className="orderSummaryItems">
                {/* Order items will come here */}
                <OrderItem />

                <div className="orderPriceBreakdown">
                    <div className="orderPriceRow">
                        <span>Subtotal</span>
                        <span>₹89,990</span>
                    </div>

                    <div className="orderPriceRow">
                        <span>Shipping Fee</span>
                        <span className="freeShipping">FREE</span>
                    </div>

                    <div className="orderPriceRow">
                        <span>Handling Fee</span>
                        <span>₹49</span>
                    </div>

                    <div className="orderTotalRow">
                        <strong>Total Amount</strong>
                        <strong>₹90,039</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OrderSummary;