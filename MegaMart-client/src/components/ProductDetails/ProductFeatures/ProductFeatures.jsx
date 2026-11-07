import "./ProductFeatures.css";

function ProductFeatures({
    features = [
        {
            icon: "bi-truck",
            title: "Free Delivery",
            description: "Free delivery on eligible orders"
        },
        {
            icon: "bi-arrow-repeat",
            title: "Easy Returns",
            description: "Easy returns as per policy"
        },
        {
            icon: "bi-shield-check",
            title: "Warranty",
            description: "Manufacturer warranty included"
        },
        {
            icon: "bi-lock",
            title: "Secure Payment",
            description: "100% secure payment"
        }
    ]
}) {
    return (
        <div className="productFeatures">

            {features.map((feature, index) => (
                <div className="productFeatureCard" key={index}>
                    <div className="featureIcon">
                        <i className={`bi ${feature.icon}`}></i>
                    </div>

                    <div className="featureContent">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default ProductFeatures;