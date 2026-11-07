import "./ProductDescription.css";

function ProductDescription({
    title = "About This Product",
    description = "Experience powerful performance and premium quality with this product.",
    highlights = [
        "High-performance processor for smooth working.",
        "Premium build quality and modern design.",
        "Advanced features for better user experience.",
        "Reliable performance for everyday use."
    ]
}) {
    return (
        <div className="productDescription">

            <div className="productDescriptionHeader">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

            <div className="productHighlights">
                <h3>Product Highlights</h3>

                <ul>
                    {highlights.map((highlight, index) => (
                        <li key={index}>
                            <i className="bi bi-check-circle-fill"></i>
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default ProductDescription;