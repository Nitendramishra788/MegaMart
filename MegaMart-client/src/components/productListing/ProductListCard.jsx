import React from "react";

const ProductCard = ({
  image,
  title,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />

      
      <a href="/product-details"><h3>{title}</h3></a>

      <div className="product-price">
        <span>₹{price}</span>
        <del>₹{originalPrice}</del>
        <span>{discount}% OFF</span>
      </div>

      <p>⭐ {rating} ({reviews} reviews)</p>

      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;