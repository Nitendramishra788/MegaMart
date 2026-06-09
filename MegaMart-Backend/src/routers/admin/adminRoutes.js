const protect = require("../../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();


const {
    
    admin

} = require("../../middlewares/adminMiddleware");

// this is part of seller permission
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


// this is part of product permission part 

const {
        getPendingProduct,
        approvedProduct,
        rejectedProduct,
} = require("../../controllers/admin/adminProductController");


// get pending product 

router.get(
    "/pending-products",
    protect,
    admin,
    getPendingProduct,

);

// approved product router

router.put(
    "/approve-product/:id",
    protect,
    admin,
    approvedProduct,
);

// rejected product router

router.put(
    "/reject-product/:id",

  protect,

  admin,
rejectedProduct,

);

module.exports=router;