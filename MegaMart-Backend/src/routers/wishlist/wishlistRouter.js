const Protect = require("../../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    addWishlist,
    getWishlist,

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

module.exports = router ;