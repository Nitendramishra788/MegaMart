function ProductCard({ img, name, category, rating, price, oldPrice }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={img} alt={name} />
            </div>

            <div className="product-details">
                <p className="product-category">{category}</p>

                <h3 className="product-name">{name}</h3>

                <div className="product-rating">
                    <i className="fa-solid fa-star"></i>
                    <span>{rating}</span>
                </div>

                <div className="product-price">
                    <span className="current-price">₹{price}</span>
                    <span className="old-price">₹{oldPrice}</span>
                </div>

                <button className="add-to-cart-btn" type="button">
                    <i className="fa-solid fa-cart-shopping"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;