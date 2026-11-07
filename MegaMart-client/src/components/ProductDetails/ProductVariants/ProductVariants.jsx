import { useState } from "react";
import "./ProductVariants.css";

function ProductVariants({
    colors = [
        { name: "Black", value: "#171717" },
        { name: "White", value: "#f5f5f5" },
        { name: "Grey", value: "#808080" }
    ],
    variants = [
        { label: "8GB RAM / 512GB SSD", value: "8GB/512GB" },
        { label: "16GB RAM / 512GB SSD", value: "16GB/512GB" },
        { label: "16GB RAM / 1TB SSD", value: "16GB/1TB" }
    ],
    onVariantChange
}) {
    const [selectedColor, setSelectedColor] = useState(colors[0]?.name || "");
    const [selectedVariant, setSelectedVariant] = useState(variants[0]?.value || "");

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);

        if (onVariantChange) {
            onVariantChange({
                color: selectedColor,
                variant
            });
        }
    };

    return (
        <div className="productVariants">

            {/* Color Selection */}
            {colors.length > 0 && (
                <div className="variantSection">
                    <div className="variantHeading">
                        <h4>Color:</h4>
                        <span>{selectedColor}</span>
                    </div>

                    <div className="colorOptions">
                        {colors.map((color) => (
                            <button
                                type="button"
                                key={color.name}
                                className={`colorOption ${
                                    selectedColor === color.name ? "selectedColor" : ""
                                }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => handleColorChange(color.name)}
                                title={color.name}
                                aria-label={`Select ${color.name} color`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Variant Selection */}
            {variants.length > 0 && (
                <div className="variantSection">
                    <div className="variantHeading">
                        <h4>Available Options:</h4>
                    </div>

                    <div className="variantOptions">
                        {variants.map((variant) => (
                            <button
                                type="button"
                                key={variant.value}
                                className={`variantOption ${
                                    selectedVariant === variant.value
                                        ? "activeVariant"
                                        : ""
                                }`}
                                onClick={() => handleVariantChange(variant.value)}
                            >
                                {variant.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

export default ProductVariants;