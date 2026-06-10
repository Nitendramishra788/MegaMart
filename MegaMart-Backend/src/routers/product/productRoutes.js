const express = require ("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware");


const {
    createProduct,
  getMyProducts,
  getAllProducts,
  getSingleProduct,
} = require("../../controllers/product/productController");



// cerate router

router.post(
    "/create",
    protect,
    seller,
   
    createProduct
);



// get specific seller product

router.get(
    "/my-products",
    protect,
    seller,
    getMyProducts
)


// PUBLIC PRODUCTS
router.get("/", getAllProducts);


// SINGLE PRODUCT
router.get("/:id", getSingleProduct);


module.exports = router;