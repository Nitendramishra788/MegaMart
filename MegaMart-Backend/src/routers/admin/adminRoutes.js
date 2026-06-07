const protect = require("../../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();


const {
    
    admin

} = require("../../middlewares/adminMiddleware");


const {
    getSellerRequests,
    approveSeller,
    rejectedSeller

} = require("../../controllers/admin/adminController");

// get pending request

router.get(
    "/seller-requests",
    protect,
    admin,
    getSellerRequests
);

// approve seller

router.put(
    "/approve-seller/:id",
    protect,
    admin,
    approveSeller
);

// request rejected 

router.put(
     "/reject-seller/:id",
     protect,
     admin,
     rejectedSeller
);

module.exports=router;