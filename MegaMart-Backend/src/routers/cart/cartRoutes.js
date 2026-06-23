const express = require("express");
const router = express.Router();

const {
  addCart,
  getCart,
  updateCart,
  removeCart,
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
  "/delete-item",
  protect,
  removeCart,
)

module.exports = router;