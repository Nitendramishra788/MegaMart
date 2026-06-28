const Protect = require("../../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    reviewCheckout,
} = require("../../controllers/checkout/checkoutController");

router.get(
    "/checkout/review",
    Protect,
    reviewCheckout
);


module.exports = router;