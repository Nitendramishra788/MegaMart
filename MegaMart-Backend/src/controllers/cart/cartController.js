const Variant = require("../../models/ProductVariant");
const Cart = require("../../models/Cart");
const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");

const addCart = asyncHandler(async (req, res) => {
  const { variantId, quantity = 1 } = req.body;

  // quantity validation
  if (quantity < 1) {
    throw new apiErrr(
      400,
      "Quantity must be greater than 0"
    );
  }

  // validate variant
  const variant = await Variant.findById(variantId);

  if (!variant) {
    throw new apiErrr(
      404,
      "Variant not found"
    );
  }

  // stock check
  if (variant.stock < quantity) {
    throw new apiErrr(
      400,
      "Insufficient stock"
    );
  }

  // find user cart
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  // create new cart if not exists
  if (!cart) {
    const newCart = await Cart.create({
      user: req.user._id,
      items: [
        {
          product: variant.product,
          variant: variant._id,
          quantity,
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Cart created successfully",
      cart: newCart,
    });
  }

  // check existing item
  const existingItem = cart.items.find(
    (item) =>
      item.variant.toString() ===
      variant._id.toString()
  );

  if (existingItem) {
    // quantity update
    existingItem.quantity += quantity;

    // optional stock re-check
    if (existingItem.quantity > variant.stock) {
      throw new apiErrr(
        400,
        "Requested quantity exceeds available stock"
      );
    }
  } else {
    // add new item
    cart.items.push({
      product: variant.product,
      variant: variant._id,
      quantity,
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    cart,
  });
});

module.exports = {
  addCart,
};