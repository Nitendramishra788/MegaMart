const Variant = require("../../models/ProductVariant");
const Product = require("../../models/Product");
const Wishlist = require("../../models/Wishlist");
const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");

const addWishlist = asyncHandler(async (req, res) => {
  const { variantId } = req.body;

  // validate variant
  const variant = await Variant.findById(variantId);

  if (!variant) {
    throw new apiErrr(404, "variant not found...!");
  }

  // find wishlist
  let wishlist = await Wishlist.findOne({ user: req.user._id });

  // IF wishlist NOT EXISTS → create
  if (!wishlist) {
    const newWishlist = await Wishlist.create({
      user: req.user._id,
      items: [
        {
          product: variant.product,
          variant: variant._id,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "wishlist created successfully..!",
      wishlist: newWishlist,
    });
  }

  // check duplicate
  const existWishlist = wishlist.items.find(
    (item) =>
      item.variant.toString() === variant._id.toString()
  );

  if (existWishlist) {
    throw new apiErrr(409, "Item already in wishlist");
  }

  // push item
  wishlist.items.push({
    product: variant.product,
    variant: variant._id,
  });

  await wishlist.save();

  return res.status(200).json({
    success: true,
    message: "wishlist updated successfully..!",
    wishlist,
  });
});

module.exports = {
  addWishlist,
};