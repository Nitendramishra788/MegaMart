const express = require("express");
const router=express.Router();
const Protect = require("../../middlewares/authMiddleware");

const {
    createShipping,
} = require("../../controllers/shipping/shippingController");
const { model } = require("mongoose");


router.post(
    "/create",
    Protect,
    createShipping,
);


module.exports = router;