const express = require("express");
const router=express.Router();
const Protect = require("../../middlewares/authMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware")

const {
    createShipping,
    updateShipmentStatus,
    getShipment,
} = require("../../controllers/shipping/shippingController");
const { model } = require("mongoose");


router.post(
    "/create",
    Protect,
    seller,
    createShipping,
);


router.patch(
    "/status/:shipmentId",
    Protect,
    seller,
    updateShipmentStatus,
);


router.get(
    "/get-shipment/:shipmentId",
    Protect,
    seller,
    getShipment,
)

module.exports = router;