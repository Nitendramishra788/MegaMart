const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");


const  {
     createPayment,
     verifyPayment,
} = require("../../controllers/payment/paymentController");


router.post(
    "/create",
    Protect,
    createPayment
);


router.post(
    "/verify",
    Protect,
    verifyPayment,
)

module.exports = router;
