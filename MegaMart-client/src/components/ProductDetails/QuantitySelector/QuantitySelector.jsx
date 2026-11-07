import { useState } from "react";
import "./QuantitySelector.css";

function QuantitySelector({
    initialQuantity = 1,
    maxQuantity = 10,
    onQuantityChange
}) {
    const [quantity, setQuantity] = useState(
        Math.min(Math.max(1, initialQuantity), maxQuantity)
    );

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);

            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        }
    };

    const increaseQuantity = () => {
        if (quantity < maxQuantity) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);

            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        }
    };

    return (
        <div className="quantitySelector">
            <h4 className="quantityHeading">Quantity:</h4>

            <div className="quantityControls">
                <button
                    type="button"
                    className="quantityBtn"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                >
                    <i className="bi bi-dash"></i>
                </button>

                <span className="quantityValue">{quantity}</span>

                <button
                    type="button"
                    className="quantityBtn"
                    onClick={increaseQuantity}
                    disabled={quantity >= maxQuantity}
                    aria-label="Increase quantity"
                >
                    <i className="bi bi-plus"></i>
                </button>
            </div>

            <span className="quantityStock">
                {maxQuantity > 0
                    ? `${maxQuantity} items available`
                    : "Out of stock"}
            </span>
        </div>
    );
}

export default QuantitySelector;