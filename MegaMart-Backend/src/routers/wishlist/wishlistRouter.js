const Protect = require("../../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    addWishlist,

} = require("../../controllers/wishlist/wishlistController");

router.post(
    "/add-wishlist",
    Protect,
    addWishlist,
)

module.exports = router ;