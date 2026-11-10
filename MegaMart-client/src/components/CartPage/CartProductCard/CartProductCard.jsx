import { Heart, Trash2 } from "lucide-react";

function CartProductCard({
    image,
    title,
    variant,
    price,
    originalPrice,
    inStock = true,
    quantity = 1,
    onQuantityChange,
    onRemove,
    onSaveForLater
}) {
    return (
        <div className="cartProductCard">

            <div className="cartProductImage">
                <img src={image} alt={title} />
            </div>

            <div className="cartProductInfo">

                <h3>{title}</h3>

                <p className="cartProductVariant">
                    {variant}
                </p>

                <p className={inStock ? "inStock" : "outOfStock"}>
                    {inStock ? "In Stock" : "Out of Stock"}
                </p>

                <div className="cartProductPrice">
                    <span className="cartSellingPrice">
                        ₹{price}
                    </span>

                    <span className="cartOriginalPrice">
                        ₹{originalPrice}
                    </span>
                </div>

                <div className="cartProductActions">

                    <div className="cartQuantity">
                        <button
                            onClick={() => onQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>

                        <span>{quantity}</span>

                        <button
                            onClick={() => onQuantityChange(quantity + 1)}
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="saveForLaterBtn"
                        onClick={onSaveForLater}
                    >
                        <Heart size={17} />
                        Save for Later
                    </button>

                    <button
                        className="removeCartBtn"
                        onClick={onRemove}
                    >
                        <Trash2 size={17} />
                        Remove
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CartProductCard;