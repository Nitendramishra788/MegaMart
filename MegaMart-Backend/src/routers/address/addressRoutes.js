const express = require("express");
const Protect = require("../../middlewares/authMiddleware");
const router = express.Router();



const {
createAddress,
getAddress,
updateAddress
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

router.put(
    "/update-address/:addressId",
    Protect,
    updateAddress,
);


module.exports = router;