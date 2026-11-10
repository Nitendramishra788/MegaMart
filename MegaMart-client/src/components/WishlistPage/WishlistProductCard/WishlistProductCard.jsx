import { ShoppingCart, Trash2, Star, Truck } from "lucide-react";

function WishlistProductCard({
    image,
    title,
    variant,
    price,
    originalPrice,
    rating,
    reviews,
    discount,
    onAddToCart,
    onRemove
}) {
    return (
        <div className="wishlistProductCard">

            {/* Product Image */}
            <div className="wishlistProductImage">
                <img src={image} alt={title} />
            </div>

            {/* Product Information */}
            <div className="wishlistProductInfo">

                <h3>{title}</h3>

                <p className="wishlistProductVariant">
                    {variant}
                </p>

                <div className="wishlistProductRating">
                    <Star size={17} fill="#f59e0b" color="#f59e0b" />
                    <span>{rating}</span>
                    <span>({reviews} reviews)</span>
                </div>

                <div className="wishlistProductPrice">

                    <span className="wishlistSellingPrice">
                        ₹{price}
                    </span>

                    <span className="wishlistOriginalPrice">
                        ₹{originalPrice}
                    </span>

                    <span className="wishlistDiscount">
                        {discount}% OFF
                    </span>

                </div>

                <div className="wishlistDelivery">
                    <Truck size={18} />
                    <span>Free Delivery</span>
                </div>

            </div>

            {/* Product Actions */}
            <div className="wishlistProductActions">

                <button
                    className="wishlistAddCartBtn"
                    onClick={onAddToCart}
                >
                    <ShoppingCart size={19} />
                    Add to Cart
                </button>

                <button
                    className="wishlistRemoveBtn"
                    onClick={onRemove}
                >
                    <Trash2 size={18} />
                    Remove
                </button>

            </div>

        </div>
    );
}

export default WishlistProductCard;