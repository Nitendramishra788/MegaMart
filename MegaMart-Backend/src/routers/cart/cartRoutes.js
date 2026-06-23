const express = require("express");
const router = express.Router();

const {
  addCart,
  getCart,
  updateCart,
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

router.put(
  "/update-cart",
  protect,
  updateCart,
)

module.exports = router;