function PriceDetails({
    subtotal,
    discount,
    deliveryCharges
}) {

    const totalAmount = subtotal - discount + deliveryCharges;

    return (
        <div className="priceDetails">

            <h3>Price Details</h3>

            <div className="priceRow">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
            </div>

            <div className="priceRow">
                <span>Discount</span>
                <span className="discountPrice">
                    -₹{discount}
                </span>
            </div>

            <div className="priceRow">
                <span>Delivery Charges</span>
                <span>
                    {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
                </span>
            </div>

            <div className="priceDivider"></div>

            <div className="totalPriceRow">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
            </div>

        </div>
    );
}

export default PriceDetails;