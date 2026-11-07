import "./ProductActions.css";

function ProductActions({
    onAddToCart,
    onBuyNow,
    disabled = false
}) {
    return (
        <div className="productActions">

            <button
                type="button"
                className="addToCartBtn"
                onClick={onAddToCart}
                disabled={disabled}
            >
                <i className="bi bi-cart-plus"></i>
                Add to Cart
            </button>

            <button
                type="button"
                className="buyNowBtn"
                onClick={onBuyNow}
                disabled={disabled}
            >
                <i className="bi bi-lightning-fill"></i>
                Buy Now
            </button>

        </div>
    );
}

export default ProductActions;