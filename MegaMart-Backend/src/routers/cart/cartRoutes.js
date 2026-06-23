const express = require("express");
const router = express.Router();

const {
  addCart,
  getCart,
  updateCart,
  removeCart,
  allClearCart,
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

router.delete(
  "/remove-item",
  protect,
  removeCart,
)

router.delete(
  "/clear-cart",
  protect,
  allClearCart,
);

module.exports = router;