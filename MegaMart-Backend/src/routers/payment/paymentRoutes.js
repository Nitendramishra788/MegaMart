const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");


const  {
     createPayment,
     verifyPayment,
     webhook,
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


router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    webhook
);

module.exports = router;
