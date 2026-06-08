const protect = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware");
const express = require("express");
const router = express.Router();

const {
    createStore,
    getMyStore,
    updateStore,
} = require("../../controllers/strore/storeController");

router.post(
    "/create",
    protect,
    seller,
    upload.fields([
        {
            name:"storeLogo",
            maxCount:1,

        },

        {
            name:"storeBanner",
            maxCount:1
        }   
    ]),

    createStore
);


// update store detail

router.put(
    "/update",
    protect,
    seller,
    upload.fields([
        {
            name:"storeLogo",
            maxCount:1
        },

        {
            name:"storeBanner",
            maxCount:1
        }

    ]),

    updateStore,
);


// get store data fetching by seller 

router.get(
    "/my-store",
    protect,
    seller,
    getMyStore,
   
);


module.exports = router;