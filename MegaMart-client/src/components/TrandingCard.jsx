function TrendingCard({
    img,
    name,
    oldPrice,
    newPrice,
    discount,
    onAddToCart
}) {
    return (
        <div className="trendingCard">
            <div className="trendingCardImg">
                <img src={img} alt={name} />

                <span className="discountBadge">
                    {discount}% OFF
                </span>
            </div>

            <div className="trendingCardBody">
                <h5>{name}</h5>

                <div className="trendingCardPrice">
                    <span className="newPrice">
                        ₹{newPrice}
                    </span>

                    <span className="oldPrice">
                        ₹{oldPrice}
                    </span>
                </div>

                <button
                    className="addToCartBtn"
                    onClick={onAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default TrendingCard;