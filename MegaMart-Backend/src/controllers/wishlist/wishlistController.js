const Variant = require("../../models/ProductVariant");
const Product = require("../../models/Product");
const Wishlist = require("../../models/Wishlist");
const asyncHandler = require("../../utils/asyncHandler");
const apiErrr = require("../../utils/apiErrr");
const Cart = require("../../models/Cart");

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


// this is part of Get wishlist api...!
const getWishlist = asyncHandler(
    async (req, res) => {

        const wishlist = await Wishlist.findOne({
            user: req.user._id
        })
            .populate(
                "items.product",
                "title brand"
            )
            .populate(
                "items.variant",
                "price stock attributes"
            );

        if (!wishlist || wishlist.items.length === 0) {
            return res.status(200).json({
                success: true,
                message: "your wishlist is empty please add something..!",
                wishlist: {
                    items: [],
                    totalItems: 0,
                }
            });
        }

        // data formating

        const formateItems = wishlist.items.map(

            (item) => {

                const product = item.product;
                const variant = item.variant;

                return {

                    _id: item._id,

                    product: {
                        _id: product?._id,
                        title: product?.title,
                        brand: product?.brand,
                    },

                    variant: {
                        _id: variant?._id,
                        price: variant?.price,
                        stock: variant?.stock,
                        attributes:
                            variant?.attributes,
                    },

                    addedAt: item.addedAt,
                };
            }
        );

        res.status(200).json({
            success: true,
            message: "your all wishlist data",
            wishlist: {
                items: formateItems,
                totalItems: formateItems.length,
            }
        });

    }
);



// remove wishlist item api..!
const removeitem = asyncHandler(
    async (req, res) => {

        const { variantId } = req.body;

        const variant = await Variant.findById(
            variantId
        );

        if (!variant) {
            throw new apiErrr(
                404,
                "variant not found...!"
            );
        }

        const wishlist = await Wishlist.findOne({
            user: req.user._id
        });

        if (!wishlist) {
            throw new apiErrr(
                404,
                "wishlist not found..!"
            );
        }

        // check wishlist exist OR not

        const existItem = wishlist.items.find(
            (item) =>
                item.variant.toString() ===
                variant._id.toString()
        );

        if (!existItem) {

            throw new apiErrr(
                404,
                "wishlist item not found..!"
            );

        } else {

            wishlist.items = wishlist.items.filter(
                (item) =>
                    item.variant.toString() !==
                    variant._id.toString()
            );

            await wishlist.save();

            res.status(200).json({
                success: true,
                message: "wishlist item remove",
                wishlist,
            });
        }
    }
);


// wishlist all clear items api...!

const wishlistAllClear = asyncHandler(
    async (req, res) => {
        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            throw new apiErrr(
                404,
                "items not found for clearing..!"
            )
        } else {
            wishlist.items = [];
        }

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "wishlist all data clear...!",
            wishlist,
        });
    }
);

// this is part of cart to wishlist api..!

const wishlistToCart = asyncHandler(
  async (req, res) => {

    const { variantId, quantity = 1 } = req.body;

    // validate quantity
    if (quantity < 1) {
      throw new apiErrr(
        400,
        "Quantity must be greater than 0"
      );
    }

    // find variant
    const variant = await Variant.findById(
      variantId
    );

    if (!variant) {
      throw new apiErrr(
        404,
        "Variant not found"
      );
    }

    // check stock
    if (variant.stock < quantity) {
      throw new apiErrr(
        400,
        "Insufficient stock"
      );
    }

    // find wishlist
    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      throw new apiErrr(
        404,
        "Wishlist not found"
      );
    }

    // check item in wishlist
    const wishlistItem = wishlist.items.find(
      (item) =>
        item.variant.toString() ===
        variant._id.toString()
    );

    if (!wishlistItem) {
      throw new apiErrr(
        404,
        "Item not found in wishlist"
      );
    }

    // find cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    // check existing cart item
    const existingItem = cart.items.find(
      (item) =>
        item.variant.toString() ===
        variant._id.toString()
    );

    if (existingItem) {

      const newQuantity =
        existingItem.quantity + quantity;

      if (newQuantity > variant.stock) {
        throw new apiErrr(
          400,
          "Requested quantity exceeds available stock"
        );
      }

      existingItem.quantity = newQuantity;

    } else {

      cart.items.push({
        product: variant.product,
        variant: variant._id,
        quantity,
      });

    }

    await cart.save();

    // remove item from wishlist
    wishlist.items = wishlist.items.filter(
      (item) =>
        item.variant.toString() !==
        variant._id.toString()
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Item moved to cart successfully",
      cart,
    });

  }
);

module.exports = {
    addWishlist,
    getWishlist,
    removeitem,
    wishlistAllClear,
    wishlistToCart,
};