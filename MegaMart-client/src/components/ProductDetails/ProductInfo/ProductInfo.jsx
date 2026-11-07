import "./ProductInfo.css";

function ProductInfo({
    brand = "ASUS",
    title = "ROG Strix G16 Gaming Laptop",
    rating = 4.6,
    reviews = 12583,
    price = 124999,
    originalPrice = 149999,
    discount = 17,
    stock = true,
    description = "Experience powerful gaming performance with the latest processor, high-speed memory and stunning display."
}) {

    return (
        <div className="productInfo">

            {/* Brand & Stock */}
            <div className="productInfoTop">

                <span className="productBrand">
                    {brand}
                </span>

                <span className={`productStock ${stock ? "inStock" : "outOfStock"}`}>
                    <i className={`bi ${stock ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}></i>

                    {stock ? "In Stock" : "Out of Stock"}
                </span>

            </div>


            {/* Product Title */}
            <h1 className="productInfoTitle">
                {title}
            </h1>


            {/* Rating */}
            <div className="productInfoRating">

                <div className="ratingStars">
                    <i className="bi bi-star-fill"></i>
                    <span>{rating}</span>
                </div>

                <span className="ratingDivider">|</span>

                <span className="productReviewCount">
                    {reviews.toLocaleString("en-IN")} Reviews
                </span>

                <span className="ratingDivider">|</span>

                <span className="verifiedProduct">
                    <i className="bi bi-patch-check-fill"></i>
                    Verified Product
                </span>

            </div>


            {/* Price Section */}
            <div className="productInfoPrice">

                <div className="currentProductPrice">
                    ₹{price.toLocaleString("en-IN")}
                </div>

                <div className="originalProductPrice">
                    ₹{originalPrice.toLocaleString("en-IN")}
                </div>

                <span className="productDiscount">
                    {discount}% OFF
                </span>

            </div>


            {/* Tax Information */}
            <p className="productTaxInfo">
                Inclusive of all taxes
            </p>


            {/* Description */}
            <div className="productShortDescription">

                <h4>Product Description</h4>

                <p>{description}</p>

            </div>


            {/* Delivery Information */}
            <div className="productDeliveryInfo">

                <div className="deliveryInfoItem">
                    <i className="bi bi-truck"></i>

                    <div>
                        <strong>Free Delivery</strong>
                        <span>On eligible orders</span>
                    </div>
                </div>

                <div className="deliveryInfoItem">
                    <i className="bi bi-arrow-repeat"></i>

                    <div>
                        <strong>Easy Returns</strong>
                        <span>As per return policy</span>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ProductInfo;