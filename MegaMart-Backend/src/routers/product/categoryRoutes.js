const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {admin} = require("../../middlewares/adminMiddleware");


const {
    createCategory,
    getAllCategories,
    getSingleCategory
} = require("../../controllers/product/categoryController");


router.post(
    "/create",
    protect,
    admin,
    createCategory
);

// get all cotegory router

router.get(
    "/all",
    getAllCategories,
);


// get single cotegory router

router.get(
    "/:id",
    getSingleCategory
)



module.exports = router;