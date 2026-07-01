const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");


const {
    createOder,
    getOders,
    getSingleOrder,
    cancelOrder,
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

router.put(
    "/cancel-order/:orderId",
    Protect,
    cancelOrder

);

module.exports = router;