const express = require("express");
const router=express.Router();
const Protect = require("../../middlewares/authMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware")

const {
    createShipping,
    updateShipmentStatus,
    getShipment,
    trackShipment,
    deliveryAttempt,
    shipmentCancellation
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
);

router.get(
    "/track/:trackingNumber",
    trackShipment
);


router.post(
    "/delivery-attempt/:shipmentId",
    Protect,
    seller,
    deliveryAttempt
);


router.patch(
    "/shipment-cancellation/:shipmentId",
    Protect,
    seller,
    deliveryAttempt
);

module.exports = router;