const express = require("express");
const router = express.Router();

const {
  addCart,
  getCart
} = require("../../controllers/cart/cartController");

const protect = require("../../middlewares/authMiddleware");

router.post(
  "/add-cart",
  protect,
  addCart
);


router.get(
    "/get-cart",
    protect,
    getCart
)

module.exports = router;