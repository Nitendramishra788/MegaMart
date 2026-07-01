const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");


const {
    createOder,
    getOders,
    getSingleOrder,
} = require("../../controllers/order/orderController");

router.post(
    "/create",
    Protect,
    createOder
);

router.get(
    "/get-orders",
    Protect,
    getOders
);

router.get(
    "/get-order/:orderId",
    Protect,
    getSingleOrder

);

module.exports = router;