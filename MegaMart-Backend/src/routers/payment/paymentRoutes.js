const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");


const  {
     createPayment,
} = require("../../controllers/payment/paymentController");


router.post(
    "/create",
    Protect,
    createPayment
);

module.exports = router;
