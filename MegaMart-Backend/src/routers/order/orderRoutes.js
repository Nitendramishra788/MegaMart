const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");


const {
    createOder,
} = require("../../controllers/order/orderController");

router.post(
    "/create",
    Protect,
    createOder
);


module.exports = router;