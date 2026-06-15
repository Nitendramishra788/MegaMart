const express = require ("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {seller} = require("../../middlewares/sellerMiddleware");


const {
    createProduct,
  getMyProducts,
  getAllProducts,
  getSingleProduct,
  getProductbyCategory,
  searchProducts
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


// this is part of filtering product 

router.get(
  "/search",
  searchProducts,
)   


// PUBLIC PRODUCTS
router.get("/", getAllProducts);


// SINGLE PRODUCT
router.get("/:id", getSingleProduct);

router.get(
  "/category/:slug",
  getProductbyCategory,
);



module.exports = router;