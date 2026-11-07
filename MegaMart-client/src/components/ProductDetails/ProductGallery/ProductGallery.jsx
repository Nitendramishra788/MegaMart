import { useState } from "react";
import "./ProductGallery.css";

function ProductGallery({ images = [], productName = "Product" }) {
    const [activeImage, setActiveImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!images.length) {
        return <div className="productGalleryEmpty">No images available</div>;
    }

    return (
        <div className="productGallery">

            {/* Thumbnail Images */}
            <div className="productThumbnailList">

                {images.map((image, index) => (
                    <button
                        type="button"
                        key={index}
                        className={`productThumbnail ${
                            activeImage === index ? "activeThumbnail" : ""
                        }`}
                        onClick={() => setActiveImage(index)}
                    >
                        <img
                            src={image}
                            alt={`${productName} view ${index + 1}`}
                        />
                    </button>
                ))}

            </div>

            {/* Main Product Image */}
            <div className="productMainImage">

                <button
                    type="button"
                    className="productZoomBtn"
                    onClick={() => setIsZoomed(true)}
                    aria-label="Zoom product image"
                >
                    <i className="bi bi-zoom-in"></i>
                </button>

                <img
                    src={images[activeImage]}
                    alt={productName}
                    className="mainProductImg"
                />

            </div>

            {/* Image Zoom Modal */}
            {isZoomed && (
                <div
                    className="productZoomOverlay"
                    onClick={() => setIsZoomed(false)}
                >
                    <button
                        type="button"
                        className="productZoomClose"
                        onClick={() => setIsZoomed(false)}
                    >
                        &times;
                    </button>

                    <img
                        src={images[activeImage]}
                        alt={productName}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

        </div>
    );
}

export default ProductGallery;