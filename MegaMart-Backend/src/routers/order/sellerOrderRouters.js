const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware");
const protect = require("../../middlewares/authMiddleware");


const {
    getSellerOrder,
    getSingleOrder,
    updateStatus,
} = require("../../controllers/order/sellerOrderController");
const { model } = require("mongoose");


// get seller oders 

router.get(
    "/get-seller-orders",
    protect,
    seller,
    getSellerOrder
);

// get singal order
router.get(
    "/get-single/order/:orderId",
    Protect,
    seller,
    getSingleOrder
);

// update status order 

router.patch(
    "/update-status/:orderId",
    Protect,
    seller,
    updateStatus,
);
module.exports = router;