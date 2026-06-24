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

module.exports = {
    addWishlist,
    getWishlist,
};