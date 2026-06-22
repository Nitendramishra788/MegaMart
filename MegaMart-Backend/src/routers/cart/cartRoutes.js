const express = require("express");
const router = express.Router();

const {
  addCart,
} = require("../../controllers/cart/cartController");

const protect = require("../../middlewares/authMiddleware");

router.post(
  "/add-cart",
  protect,
  addCart
);

module.exports = router;