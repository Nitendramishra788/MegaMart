const Product = require("../models/Product");
const Variant = require("../models/ProductVariant");





//  Price Range
const getPriceRange = (variants) => {

  if (variants.length === 0) {
    return {
      min: 0,
      max: 0,
    };
  }

  const prices = variants.map(
    (v) => v.price
  );

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

//  Stock Status (product level)
const getStockStatus = (variants) => {
  const hasStock = variants.some((v) => v.stock > 0);

  if (!hasStock) return "out_of_stock";

  const lowStock = variants.some((v) => v.stock > 0 && v.stock <= 5);

  if (lowStock) return "low_stock";

  return "in_stock";
};

//  Main service
const getProductDetailsService = async (productId) => {
  const product = await Product.findById(productId)
    .populate("category")
    .populate("seller", "name email")
    .populate("store")
    .populate("defaultVariant");

  if (!product) return null;

  const variants = await Variant.find({ product: productId });

 
  const priceRange = getPriceRange(variants);
  const stockStatus = getStockStatus(variants);

  return {
    product,
    variants,
    priceRange,
    stockStatus,
  };
};

module.exports = {
  getProductDetailsService,
};