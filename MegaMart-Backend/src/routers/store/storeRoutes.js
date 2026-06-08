const protect = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware");
const express = require("express");
const router = express.Router();

const {
    createStore,
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


module.exports = router;