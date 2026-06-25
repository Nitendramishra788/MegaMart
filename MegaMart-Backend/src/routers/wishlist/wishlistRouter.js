const Protect = require("../../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    addWishlist,
    getWishlist,
    removeitem,
    wishlistAllClear,
    wishlistToCart,
} = require("../../controllers/wishlist/wishlistController");
const protect = require("../../middlewares/authMiddleware");

router.post(
    "/add-wishlist",
    Protect,
    addWishlist,
);


router.get(
    "/get-wishlist",
    protect,
    getWishlist,
);


router.delete(
    "/remove-wishlist",
    Protect,
    removeitem
);

router.delete(
    "/clear-wishlist",
    Protect,
    wishlistAllClear
);

// this is wishlist to cart router

router.post(
    "/wishlist-cart",
    Protect,
    wishlistToCart,
);

module.exports = router ;