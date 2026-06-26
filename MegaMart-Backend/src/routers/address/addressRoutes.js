const express = require("express");
const Protect = require("../../middlewares/authMiddleware");
const router = express.Router();



const {
createAddress,
} = require("../../controllers/address/addressController");

router.post(
    "/create",
    Protect,
    createAddress,
);


module.exports = router;