const express = require("express");
const Protect = require("../../middlewares/authMiddleware");
const router = express.Router();



const {
createAddress,
getAddress,
} = require("../../controllers/address/addressController");

router.post(
    "/create",
    Protect,
    createAddress,
);

router.get(
    "/get-addresses",
    Protect,
    getAddress
)


module.exports = router;