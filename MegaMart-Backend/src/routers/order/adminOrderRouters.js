const express = require("express");
const router = express.Router();
const Protect = require("../../middlewares/authMiddleware");
const {admin} = require("../../middlewares/adminMiddleware");
const {
    getAllOrders,
} = require("../../controllers/order/adminOrderController");

router.get("/all-orders", 
    
    Protect,
    admin,
    getAllOrders);
  

module.exports = router;