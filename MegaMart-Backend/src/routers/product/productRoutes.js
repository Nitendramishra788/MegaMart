const express = require ("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware");
const upload = require("../../middlewares/uploadMiddleware");

const {
    createProduct,
} = require("../../controllers/product/productController");



// cerate router

router.post(
    "/create",
    protect,
    seller,
    upload.array("images" , 5),
    createProduct
);


module.exports = router;